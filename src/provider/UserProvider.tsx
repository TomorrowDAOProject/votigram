import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import {
  UserContextState,
  UserContextType,
  CustomJwtPayload,
  User,
} from "./types/UserProviderType";

const initialState: UserContextState = {
  user: {
    userPoints: {
      consecutiveLoginDays: 1,
      dailyLoginPointsStatus: false,
      userTotalPoints: 0,
    },
    isNewUser: false,
  },
  token: null,
  loading: true,
  error: null,
};

// Create a context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Base URL
const BASE_URL = "https://test-api.tmrwdao.com";

type Action =
  | { type: "SET_USER_DATA"; payload: User }
  | { type: "SET_TOKEN"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const dataReducer = (
  state: UserContextState,
  action: Action
): UserContextState => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, user: action.payload, loading: false };
    case "SET_TOKEN":
      return { ...state, token: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`);
  }
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

// UserProvider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  useEffect(() => {
    const fetchTokenAndData = async () => {
      try {
        const initData =
          window?.Telegram?.WebApp?.initData ||
          "user=%7B%22id%22%3A6964861250%2C%22first_name%22%3A%22Eran%22%2C%22last_name%22%3A%22Khoo%22%2C%22username%22%3A%22kea08111%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Ff4ZHGhoTj1E_IzAdBfjgNbwtY8gCkjvvsiH_02VVCO2JCz3hGOaPR1xO19VL4J5_.svg%22%7D&chat_instance=2100913806025303360&chat_type=private&auth_date=1733474064&signature=w-CeKKfbee2ZDoJjQxec2_RBhuI0Rp54TGp4lpcCdZk3sq3nRMusa9SzvPz_sTdZyudXZCy8ind4mv17zjSnAg&hash=8d8c0c1ec5eda90fd9054fec199568c495f832fe2567403d07ba8e22846c5a55";

        const toUrlEncoded = (obj: Record<string, string>) => {
          return Object.entries(obj)
            .map(([key, value]) => {
              let encodedValue;
              if (typeof value === "object" && value !== null) {
                // If the value is an object, stringify it
                encodedValue = encodeURIComponent(JSON.stringify(value));
              } else {
                // Otherwise, encode normally
                encodedValue = encodeURIComponent(value);
              }
              return `${encodeURIComponent(key)}=${encodedValue}`;
            })
            .join("&");
        };

        // Fetch token
        const tokenResponse = await fetch(`${BASE_URL}/connect/token`, {
          method: "POST",
          body: toUrlEncoded({
            grant_type: "signature",
            client_id: "TomorrowDAOServer_App",
            scope: "TomorrowDAOServer",
            login_type: "TG",
            init_data: initData,
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        if (!tokenResponse.ok) throw new Error("Failed to fetch token");
        const tokenData = await tokenResponse.json();

        dispatch({ type: "SET_TOKEN", payload: tokenData.access_token });

        Cookies.set("access_token", tokenData.access_token);

        const decodedToken = jwtDecode<CustomJwtPayload>(
          tokenData.access_token
        );
        // Fetch user points data
        const userPointsResponse = await fetch(
          `${BASE_URL}/api/app/user/login-points/status?chainId=tDVW`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!userPointsResponse.ok)
          throw new Error("Failed to fetch user points");
        const userPointsData = await userPointsResponse.json();

        // Combine and set user data
        dispatch({
          type: "SET_USER_DATA",
          payload: {
            isNewUser: !!decodedToken.new_user || false,
            userPoints: userPointsData.data,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch({ type: "SET_ERROR", payload: (error as Error).message });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    if (state.loading) {
      fetchTokenAndData();
    }
  }, [state.loading]);

  const hasUserData = () => {
    return state.user.userPoints !== null;
  };

  const updateDailyLoginPointsStatus = (value: boolean) => {
    dispatch({
      type: "SET_USER_DATA",
      payload: {
        ...state.user,
        userPoints: {
          ...state.user.userPoints,
          dailyLoginPointsStatus: value,
        },
      } as User,
    });
  };

  return (
    <UserContext.Provider
      value={{ ...state, hasUserData, updateDailyLoginPointsStatus }}
    >
      {children}
    </UserContext.Provider>
  );
};
