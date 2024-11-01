import { smoothOutput } from "@/utils/helpers";

import api from "../config/axiosInstance";
import authService from "./authService";

interface OnDataCallback {
  (chunk: string): void;
}
const LINK = process.env.NEXT_PUBLIC_API_URL;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function startResearch(data: any): Promise<any> {
  try {
    const response = await api.post("/cos/research", data);
    return response.data;
  } catch (error) {
    console.error("Error asking Research:", error);
    throw error;
  }
}

export async function getOutlineStream(
  id: string,
  onData: OnDataCallback,
  provider: "gpt" | "claude"
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
      `${LINK}/${
        provider === "gpt" ? "chatgpt" : "claude"
      }/outline/stream/${id}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        try {
          token = await authService.refreshToken();
          if (token) {
            headers["Authorization"] = "Bearer " + token;
            response = await fetch(
              `${LINK}/${
                provider === "gpt" ? "chatgpt" : "claude"
              }/outline/stream/${id}`,
              {
                method: "GET",
                headers: headers,
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

    // Read stream
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
        // Smooth delay before UI update
        if (onData && typeof onData === "function") {
          await smoothOutput(chunk, onData);
        }
      }
    }
  } catch (error) {
    console.error("Error in getOutlineStream:", error);
    throw error;
  }
}

export async function getArticleStream(
  id: string,
  onData: OnDataCallback,
  provider: "gpt" | "claude"
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
      `${LINK}/${
        provider === "gpt" ? "chatgpt" : "claude"
      }/article/stream/${id}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        try {
          token = await authService.refreshToken();
          if (token) {
            headers["Authorization"] = "Bearer " + token;
            response = await fetch(
              `${LINK}/${
                provider === "gpt" ? "chatgpt" : "claude"
              }/article/stream/${id}`,
              {
                method: "GET",
                headers: headers,
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

    // Read stream
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
        // Smooth delay before UI update
        if (onData && typeof onData === "function") {
          await smoothOutput(chunk, onData);
        }
      }
    }
  } catch (error) {
    console.error("Error in getArticleStream:", error);
    throw error;
  }
}

export async function getThumbnailStream(
  id: string,
  onData: OnDataCallback,
  provider: "gpt" | "claude"
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
      `${LINK}/${
        provider === "gpt" ? "chatgpt" : "claude"
      }/thumbnail/stream/${id}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        try {
          token = await authService.refreshToken();
          if (token) {
            headers["Authorization"] = "Bearer " + token;
            response = await fetch(
              `${LINK}/${
                provider === "gpt" ? "chatgpt" : "claude"
              }/thumbnail/stream/${id}`,
              {
                method: "GET",
                headers: headers,
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

    // Read stream
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
        // Smooth delay before UI update
        if (onData && typeof onData === "function") {
          await smoothOutput(chunk, onData);
        }
      }
    }
  } catch (error) {
    console.error("Error in getThumbnailStream:", error);
    throw error;
  }
}

export async function getResearchStream(
  id: string,
  onData: OnDataCallback,
  signal: AbortSignal
): Promise<string> {
  try {
    let token = authService.getAccessToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    let response = await fetch(`${LINK}/perp/research/stream/${id}`, {
      method: "GET",
      headers: headers,
      signal: signal, // Add signal for cancelation capability
    });

    if (!response.ok) {
      if (response.status === 401) {
        try {
          token = await authService.refreshToken();
          if (token) {
            headers["Authorization"] = "Bearer " + token;
            response = await fetch(`${LINK}/perp/research/stream/${id}`, {
              method: "GET",
              headers: headers,
              signal: signal, // Add signal for repeat request
            });
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

    // Read stream
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

        // Smooth delay before UI update
        if (onData && typeof onData === "function") {
          await smoothOutput(chunk, onData);
        }
      }

      // Check if the request was aborted
      if (signal && signal.aborted) {
        reader!.cancel();
        throw new DOMException("Aborted", "AbortError");
      }
    }

    return accumulatedText; // Return the accumulated text if needed
  } catch (error) {
    console.error("Error in getResearchStream:", error);
    throw error;
  }
}
