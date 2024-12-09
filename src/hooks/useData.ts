/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import useSWR, { Arguments, mutate } from "swr";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

const toUrlEncoded = (data: Record<string, any>, prefix = ""): string => {
  const segments: string[] = [];

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      const newPrefix = prefix
        ? `${prefix}[${encodeURIComponent(key)}]`
        : encodeURIComponent(key);

      if (typeof value === "object" && value !== null) {
        // Recursively format nested objects
        segments.push(toUrlEncoded(value, newPrefix));
      } else {
        // Encode key-value pair
        segments.push(`${newPrefix}=${encodeURIComponent(value)}`);
      }
    }
  }

  return segments.join("&");
};

const baseURL = "https://test-api.tmrwdao.com";

// Fetcher function that includes the Authorization token
const fetchWithToken = (endpoint: string) => {
  const token = Cookies.get("access_token");

  return fetch(`${baseURL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    if (!res.ok) throw new Error("Error fetching data");
    const result = await res.json();
    return result.data;
  });
};

// POST function with cache update using mutate
export const postWithToken = async (
  endpoint: string,
  data: Record<string, any>,
  contentType: string = "application/json"
): Promise<any> => {
  const token = Cookies.get("accessToken");

  // Set up headers, conditionally adding Authorization
  const headers: HeadersInit = {
    "Content-Type": contentType,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // Convert data based on content type
  const body =
    contentType === "application/x-www-form-urlencoded"
      ? toUrlEncoded(data)
      : JSON.stringify(data);

  const response = await fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) throw new Error("Failed to post data");

  const result = await response.json();

  // Optimistically update the cache for the endpoint
  mutate(
    endpoint,
    async (currentData: any) => {
      return [...(currentData || []), result];
    },
    false
  );

  // Revalidate cache to ensure consistency with the server
  mutate(endpoint);

  return result;
};

export const useData = (endpoint: string) => useSWR(endpoint, fetchWithToken);

export const useInfinite = (
  getKey: SWRInfiniteKeyLoader<any, Arguments>,
  initialSize: number
) =>
  useSWRInfinite(
    getKey,
    fetchWithToken,
    { initialSize } // Start with no pages loaded
  );

export default useData;
