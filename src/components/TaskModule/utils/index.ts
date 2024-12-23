import { UserTaskDetail } from "@/constants/task";

export const openNewPageWaitPageVisible = async (
  url: string,
  taskId: UserTaskDetail,
  req: () => Promise<{
    code: string;
    data: boolean;
  }>
) => {
  if (
    taskId === UserTaskDetail.ExploreJoinTgChannel ||
    taskId === UserTaskDetail.ExploreSchrodinger ||
    taskId === UserTaskDetail.ExploreJoinVotigram
  ) {
    // web.telegram.org will destroy the page when openTelegramLink
    // so send complete request before open link
    if (window?.Telegram?.WebApp?.platform?.includes("web")) {
      return req()
        .then(() => {
          window?.Telegram?.WebApp?.openTelegramLink?.(url);
          return true;
        })
        .catch(() => {
          window?.Telegram?.WebApp?.openTelegramLink?.(url);
          return false;
        });
    }
    window?.Telegram?.WebApp?.openTelegramLink?.(url);
  } else {
    window?.Telegram?.WebApp?.openLink?.(url);
  }
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      if (document.visibilityState === "visible") {
        setTimeout(() => {
          resolve(false);
        }, 2000);
      } else {
        const handleVisibilityChange = () => {
          if (document.visibilityState === "visible") {
            resolve(false);
          }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
      }
    }, 200);
  });
};
