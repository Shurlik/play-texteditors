import { smoothOutput } from "@/utils/helpers";

import api from "../config/axiosInstance";
import authService from "./authService";

interface Ad {
  id?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [name: string]: any;
}

interface StreamData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type OnDataCallback = (chunk: string) => void;

const LINK = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAds(ad: string): Promise<any> {
  try {
    const response = await api.get(`/ads?ad=${ad}`);
    return response.data;
  } catch (e) {
    console.error("error:", e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLeadMagnets(): Promise<any> {
  try {
    const response = await api.get(`/ads/leadmagnets`);
    return response.data;
  } catch (e) {
    console.error("error:", e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getOffers(): Promise<any> {
  try {
    const response = await api.get(`/ads/offers`);
    return response.data;
  } catch (e) {
    console.error("error:", e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function addAds(data: Ad): Promise<any> {
  try {
    const response = await api.post(`/ads`, { ...data });
    return response.data;
  } catch (e) {
    console.error("error:", e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteAd(id: number): Promise<any> {
  try {
    const response = await api.delete(`/ads/${id}`);
    return response.data;
  } catch (e) {
    console.error("error:", e);
  }
}

export async function getBenefitsStream(
  data: StreamData,
  onData?: OnDataCallback
): Promise<void> {
  try {
    let token = authService.getAccessToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    let response = await fetch(`${LINK}/ads/benefits/stream`, {
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
            response = await fetch(`${LINK}/ads/benefits/stream`, {
              method: "POST",
              headers: headers,
              body: JSON.stringify({ ...data }),
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

    // Reading the stream
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    while (!done && reader) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });

        // Smooth delay before updating UI
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

export async function getResultStream(
  data: StreamData,
  onData?: OnDataCallback
): Promise<void> {
  try {
    let token = authService.getAccessToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = "Bearer " + token;
    }

    let response = await fetch(`${LINK}/ads/result/stream`, {
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
            response = await fetch(`${LINK}/ads/result/stream`, {
              method: "POST",
              headers: headers,
              body: JSON.stringify({ ...data }),
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

    // Reading the stream
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    while (!done && reader) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });

        // Smooth delay before updating UI
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