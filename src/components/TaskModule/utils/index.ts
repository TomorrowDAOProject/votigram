import { USER_TASK_DETAIL } from "@/constants/task";

export const openNewPageWaitPageVisible = (
  url: string,
  taskId: USER_TASK_DETAIL,
  onFinish?: () => void
) => {
  if (
    taskId === USER_TASK_DETAIL.EXPLORE_JOIN_TG_CHANNEL ||
    taskId === USER_TASK_DETAIL.EXPLORE_SCHRODINGER ||
    taskId === USER_TASK_DETAIL.EXPLORE_JOIN_VOTIGRAM
  ) {
    // web.telegram.org will destroy the page when openTelegramLink
    // so send complete request before open link
    if (window?.Telegram?.WebApp?.platform?.includes("web")) {
      onFinish?.();
    }
    window?.Telegram?.WebApp?.openTelegramLink?.(url);
  } else {
    window?.Telegram?.WebApp?.openLink?.(url);
  }
  setTimeout(() => {
    if (document.visibilityState === "visible") {
      setTimeout(() => {
        onFinish?.();
      }, 2000);
    } else {
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          onFinish?.();
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
  }, 200);
};
