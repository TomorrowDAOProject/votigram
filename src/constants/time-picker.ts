export const HOUR_RANGE = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

export const MINUTE_RANGE = Array.from(
  { length: 60 },
  (_, i) => `${i < 10 ? "0" : ""}${i}`
);

export const PERIOD_RANGE = ["AM", "PM"];

export const DURATION_RANGE: {
  value: number;
  label: string;
}[] = [{
  label: '1 Hour',
  value: 3600,
}, {
  label: '1 Day',
  value: 86400,
}, {
  label: '3 Day',
  value: 259200,
}, {
  label: '5 Day',
  value: 432000,
}, {
  label: '1 Week',
  value: 604800,
}, {
  label: '2 Weeks',
  value: 1209600,
}]
