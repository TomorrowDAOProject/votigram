import { TelegramPlatform } from '@portkey/did-ui-react';

export const isInTelegram = () => {
  if (typeof window !== 'undefined') {
    return TelegramPlatform.isTelegramPlatform();
  }
  return false;
};
