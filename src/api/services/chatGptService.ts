import { smoothOutput } from "@/utils/helpers";

import api from "../config/axiosInstance";
import authService from "./authService";

interface AskGptResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface CreateDetailsResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Person {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const LINK = process.env.NEXT_PUBLIC_API_URL;

// Define the function to ask GPT
export async function askGpt(
  prompt: string,
  ids: string[]
): Promise<AskGptResponse> {
  try {
    const response = await api.post("/chatgpt", { prompt, ids });
    return response.data;
  } catch (error) {
    console.error("Error asking GPT:", error);
    throw error;
  }
}

// Define the function to create details
export async function createDetails(
  id: string
): Promise<CreateDetailsResponse> {
  try {
    const response = await api.post(`/chatgpt/conclusion/${id}`, { test: 123 });
    return response.data;
  } catch (error) {
    console.error("Error creating details:", error);
    throw error;
  }
}

// Define the function to generate a full person automatically
export async function generateFullPersonAuto(
  country: string,
  gender: string
): Promise<Person> {
  try {
    const response = await api.post("/persons", {
      country,
      gender,
      type: "auto",
    });
    return response.data;
  } catch (error) {
    console.error("Error generating full person auto:", error);
    throw error;
  }
}

// Define the function to generate a person section
export async function generatePersonSection(
  country: string,
  section: string
): Promise<Person> {
  try {
    const response = await api.post("/persons/section", { country, section });
    return response.data;
  } catch (error) {
    console.error("Error generating person section:", error);
    throw error;
  }
}

// Define the function to ask GPT with streaming response
export async function askGptStream(
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

    let response = await fetch(`${LINK}/chatgpt/stream`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ prompt, ids }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        try {
          token = await authService.refreshToken();
          if (token) {
            headers["Authorization"] = "Bearer " + token;
            response = await fetch(`${LINK}/chatgpt/stream`, {
              method: "POST",
              headers: headers,
              body: JSON.stringify({ prompt, ids }),
            });
            if (!response.ok) {
              throw new Error("Network response was not ok after token refresh");
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

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let accumulatedText = "";

    while (!done) {
      const { value, done: doneReading } = await reader?.read() || { value: undefined, done: true };
      done = doneReading;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;
        // Плавная задержка перед обновлением UI
        if (onData && typeof onData === "function") {
          await smoothOutput(chunk, onData);
        }
      }
    }
  } catch (error) {
    console.error("Error in askGptStream:", error);
    throw error;
  }
}
