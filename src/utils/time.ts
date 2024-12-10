import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function timeAgo(inputDate: Date): string {
  return dayjs(inputDate).fromNow();
}
