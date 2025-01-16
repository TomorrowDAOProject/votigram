export interface ShowPromiseResult {
  done: boolean;
  description: string;
  state: "load" | "render" | "playing" | "destroy";
  error: boolean;
}

type BannerType = "RewardedVideo" | "FullscreenMedia";

interface AdsgramInitParams {
  blockId: string;
  debug?: boolean;
  debugBannerType?: BannerType;
}

type EventType =
  | "onReward"
  | "onStart"
  | "onSkip"
  | "onBannerNotFound"
  | "onError";
type HandlerType = () => void;

export interface AdController {
  show(): Promise<ShowPromiseResult>;
  addEventListener(): void;
  removeEventListener(): void;
  destroy(): void;
}

declare global {
  interface Window {
    Adsgram?: {
      init(): AdController;
    };
  }
}
