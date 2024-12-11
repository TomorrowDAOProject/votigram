export const HOUR_RANGE = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

export const MINUTE_RANGE = Array.from(
  { length: 60 },
  (_, i) => `${i < 10 ? "0" : ""}${i}`
);

export const PERIOD_RANGE = ["AM", "PM"];
