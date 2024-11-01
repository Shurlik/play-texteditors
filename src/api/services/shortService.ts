import { smoothOutput } from "@/utils/helpers";

import api from "../config/axiosInstance";
import authService from "./authService";

interface ShortsStreamData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const LINK = process.env.NEXT_PUBLIC_API_URL;

export async function getShortsStream(
  data: ShortsStreamData,
  onData?: (chunk: string) => void
): Promise<void> {
  try {
    let token = authService.getAccessToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    let response = await fetch(`${LINK}/shorts/result/stream`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ ...data }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        try {
          token = await authService.refreshToken();
          if (token) {
            headers["Authorization"] = "Bearer " + token;
            response = await fetch(`${LINK}/shorts/result/stream`, {
              method: "POST",
              headers: headers,
              body: JSON.stringify({ ...data }),
            });
            if (!response.ok) {
              throw new Error(
                "Network response was not ok after token refresh"
              );
            }
          } else {
            await authService.logout();
            throw new Error("Unauthorized - No token received");
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          await authService.logout();
          throw new Error("Unauthorized - Token refresh failed");
        }
      } else {
        throw new Error(
          "Network response was not ok - Status: " + response.status
        );
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
        if (onData && typeof onData === "function") {
          await smoothOutput(chunk, onData);
        }
      }
    }
  } catch (error) {
    console.error("Error in Stream:", error);
    throw error;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getShorts(): Promise<any> {
  try {
    const response = await api.get(`/shorts`);
    return response.data;
  } catch (e) {
    console.log("Error fetching shorts:", e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addShorts(data: ShortsStreamData): Promise<any> {
  try {
    const response = await api.post(`/shorts`, { ...data });
    return response.data;
  } catch (e) {
    console.log("Error adding shorts:", e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteShorts(id: string): Promise<any> {
  try {
    const response = await api.delete(`/shorts/${id}`);
    return response.data;
  } catch (e) {
    console.log("Error deleting shorts:", e);
  }
}
