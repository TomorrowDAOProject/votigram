import { VoteTimeItem } from "@/types/app";

export const HOUR_RANGE = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

export const MINUTE_RANGE = Array.from(
  { length: 60 },
  (_, i) => `${i < 10 ? "0" : ""}${i}`
);

export const PERIOD_RANGE = ["AM", "PM"];

export const DURATION_RANGE: VoteTimeItem[] = [
  {
    label: "1 Hour",
    unit: "hour",
    value: 1,
  },
  {
    label: "1 Day",
    unit: "hour",
    value: 24,
  },
  {
    label: "3 Day",
    unit: "day",
    value: 72,
  },
  {
    label: "5 Day",
    unit: "day",
    value: 120,
  },
  {
    label: "1 Week",
    unit: "day",
    value: 168,
  },
  {
    label: "2 Weeks",
    unit: "day",
    value: 336,
  },
];
