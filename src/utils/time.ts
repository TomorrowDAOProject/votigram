import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function timeAgo(inputDate: number): string {
  return dayjs(inputDate).fromNow();
}
