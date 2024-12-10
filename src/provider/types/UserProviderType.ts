import { JwtPayload } from "jwt-decode";

export interface UserPoints {
  consecutiveLoginDays: number;
  dailyLoginPointsStatus: boolean;
  userTotalPoints: number;
}

export interface User {
  userPoints: UserPoints | null;
  isNewUser: boolean;
}

export interface UserContextState {
  user: User;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface CustomJwtPayload extends JwtPayload {
  new_user?: boolean;
}

export interface UserContextType extends UserContextState {
  hasUserData: () => boolean;
  updateDailyLoginPointsStatus: (value: boolean) => void;
}
