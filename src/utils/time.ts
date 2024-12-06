export const timeAgo = (inputDate: Date): string => {
  const now = new Date();
  const millisecondsDifference = now.getTime() - inputDate.getTime();

  const seconds = Math.floor(millisecondsDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Roughly estimate one month as 30 days

  if (months >= 1) {
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } 
  if (days >= 1) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } 
  if (hours >= 1) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } 
  if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  return `just now`;
}
