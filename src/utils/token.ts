export const toUrlEncoded = (obj: Record<string, string>) => {
  return Object.entries(obj)
    .map(([key, value]) => {
      let encodedValue;
      if (typeof value === "object" && value !== null) {
        // If the value is an object, stringify it
        encodedValue = encodeURIComponent(JSON.stringify(value));
      } else {
        // Otherwise, encode normally
        encodedValue = encodeURIComponent(value);
      }
      return `${encodeURIComponent(key)}=${encodedValue}`;
    })
    .join("&");
};
