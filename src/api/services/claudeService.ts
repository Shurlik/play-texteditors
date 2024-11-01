import { smoothOutput } from "@/utils/helpers";

import api from "../config/axiosInstance";
import authService from "./authService";

interface AskClaudeResponse {
  // Define the structure of the response data here
  // For example:
  result: string;
}

export async function askClaude(
  prompt: string,
  ids: string[]
): Promise<AskClaudeResponse> {
  try {
    const response = await api.post<AskClaudeResponse>("/claude", {
      prompt,
      ids,
    });
    return response.data;
  } catch (error) {
    console.error("Error asking Claude:", error);
    throw error;
  }
}

export async function askClaudeStream(
  prompt: string,
  ids: string[],
  onData: (data: string) => void
): Promise<void> {
  try {
    let token = authService.getAccessToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/claude/stream`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ prompt, ids }),
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        try {
          token = await authService.refreshToken();
          if (token) {
            headers["Authorization"] = "Bearer " + token;
            response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/claude/stream`,
              {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ prompt, ids }),
              }
            );
            if (!response.ok) {
              throw new Error(
                "Network response was not ok after token refresh"
              );
            }
          } else {
            await authService.logout();
            throw new Error("Unauthorized");
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          await authService.logout();
          throw new Error("Unauthorized");
        }
      } else {
        throw new Error("Network response was not ok");
      }
    }

    // Reading the stream
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let accumulatedText = "";

    while (!done) {
      const { value, done: doneReading } = await reader!.read();
      done = doneReading;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        console.log(accumulatedText);
        // Smooth delay before updating UI
        if (onData && typeof onData === "function") {
          await smoothOutput(chunk, onData);
        }
      }
    }
  } catch (error) {
    console.error("Error in askClaudeStream:", error);
    throw error;
  }
}
