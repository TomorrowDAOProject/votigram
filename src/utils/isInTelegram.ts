export const isInTelegram = () => {
  if (typeof window !== 'undefined') {
    return !!window.Telegram;
  }
  return false;
};
