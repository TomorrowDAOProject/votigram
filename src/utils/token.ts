export const parseQueryString = (queryString: string) => {
  // Create a URLSearchParams object
  const params = new URLSearchParams(queryString);

  // Initialize an empty object to store parsed data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};

  // Iterate over each key in the URLSearchParams object
  for (const [key, value] of params.entries()) {
    // Check if the key is 'user', which needs to be parsed as JSON
    if (key === "user") {
      result[key] = decodeURIComponent(value);
    } else {
      // Parse other values normally
      result[key] = value;
    }
  }

  return result;
};
