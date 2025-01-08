import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import {
  UserContextState,
  UserContextType,
  CustomJwtPayload,
  User,
  IConfigContent,
} from "./types/UserProviderType";
import { fetchToken } from "@/utils/token";
import { webLoginInstance } from "@/contract/webLogin";
import { useConnectWallet } from "@aelf-web-login/wallet-adapter-react";
import { isInTelegram } from "@/utils/isInTelegram";
import { useAsyncEffect, useRequest } from "ahooks";
import { host } from "@/config";
import { chainId } from "@/constants/app";

let RETRY_MAX_COUNT = 3;

const initialState: UserContextState = {
  user: {
    userPoints: {
      consecutiveLoginDays: 1,
      dailyLoginPointsStatus: true,
      dailyPointsClaimedStatus: [],
      userTotalPoints: 0,
    },
    isNewUser: false,
  },
  cmsData: null,
  token: null,
  loading: true,
  error: null,
};

// Create a context
const UserContext = createContext<UserContextType | undefined>(undefined);

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

const getUserPoints = async (accessToken: string) => {
  // Fetch user points data
  const userPointsResponse = await fetch(
    `${
      import.meta.env.VITE_BASE_URL
    }/api/app/user/login-points/status?chainId=${chainId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!userPointsResponse.ok) throw new Error("Failed to fetch user points");
  const userPointsData = await userPointsResponse.json();
  return userPointsData;
};

// UserProvider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const webLoginContext = useConnectWallet();
  const {
    connectWallet,
    disConnectWallet,
    walletInfo: wallet,
    isConnected,
    getSignature,
  } = useConnectWallet();
  const [cmsData, setCmsData] = useState<IConfigContent | null>(null);

  const { run: fetchPortKeyToken, cancel } = useRequest(
    async () => {
      const timestamp = Date.now();
      const sign = await getSignature({
        appName: "TomorrowDAOServer",
        address: wallet!.address,
        signInfo: Buffer.from(`${wallet?.address}-${timestamp}`).toString(
          "hex"
        ),
      });
      const requestObject = {
        grant_type: "signature",
        scope: "TomorrowDAOServer",
        client_id: "TomorrowDAOServer_App",
        timestamp: timestamp.toString(),
        signature: sign?.signature ?? "",
        source: "portkey",
        publickey: wallet?.extraInfo?.publicKey || "",
        chain_id: wallet?.extraInfo?.portkeyInfo?.chainId ?? "",
        ca_hash: wallet?.extraInfo?.portkeyInfo?.caInfo?.caHash ?? "",
        address: wallet?.address ?? "",
      };
      const portKeyRes = await fetch(
        `${import.meta.env.VITE_BASE_URL}/connect/token`,
        {
          method: "POST",
          body: new URLSearchParams(requestObject).toString(),
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const portKeyResObj = await portKeyRes.json();
      if (portKeyRes?.ok && portKeyResObj?.access_token) {
        cancel();
      }
    },
    {
      manual: true,
      pollingInterval: 1500,
    }
  );

  const fetchCMSData = async () => {
    const cmsRes = await fetch(host + "/cms/items/config", {
      cache: "no-store",
    });
    const {
      data: { config },
    } = await cmsRes.json();
    setCmsData(config);
  };

  const fetchTokenAndData = async () => {
    try {
      const access_token = await fetchToken();

      if (!access_token) {
        await disConnectWallet();
        const error = new Error("Failed to fetch token");
        error.name = "401";
        throw error;
      }

      dispatch({ type: "SET_TOKEN", payload: access_token });
      await localStorage.setItem("access_token", access_token);
      const decodedToken = jwtDecode<CustomJwtPayload>(access_token);
      const userPointsData = await getUserPoints(access_token);
      // Combine and set user data
      dispatch({
        type: "SET_USER_DATA",
        payload: {
          isNewUser: !!Number(decodedToken.new_user) || false,
          userPoints: userPointsData?.data,
        },
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "401" &&
        RETRY_MAX_COUNT > 0
      ) {
        RETRY_MAX_COUNT = RETRY_MAX_COUNT - 1;
        fetchTokenAndData();
      } else {
        RETRY_MAX_COUNT = 3;
      }
      console.error("Error fetching data:", error);
      dispatch({ type: "SET_ERROR", payload: (error as Error).message });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    if (state.loading) {
      fetchTokenAndData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  useAsyncEffect(async () => {
    if (!wallet) {
      return;
    }
    webLoginInstance.setWebLoginContext(webLoginContext);
  }, [webLoginContext]);

  useEffect(() => {
    if (isConnected && wallet) {
      fetchPortKeyToken();
    }
  }, [fetchPortKeyToken, isConnected, wallet]);

  useEffect(() => {
    if (!isInTelegram() && !isConnected) {
      connectWallet();
      return;
    }
  }, [connectWallet, isConnected]);

  useEffect(() => {
    fetchCMSData();
  }, []);

  const hasUserData = () => {
    return state.user.userPoints !== null;
  };

  const updateDailyLoginPointsStatus = (points: number) => {
    const userPoints = state.user.userPoints;
    const currentClaimed =
      userPoints?.dailyPointsClaimedStatus?.filter((isClaimed) => isClaimed)
        ?.length || 0;
    dispatch({
      type: "SET_USER_DATA",
      payload: {
        ...state.user,
        userPoints: {
          ...state.user.userPoints,
          dailyLoginPointsStatus: true,
          userTotalPoints: points,
          dailyPointsClaimedStatus: userPoints?.dailyPointsClaimedStatus.map(
            (_, index) => index < currentClaimed + 1
          ),
        },
      } as User,
    });
  };

  const updateUserPoints = (points: number) => {
    dispatch({
      type: "SET_USER_DATA",
      payload: {
        ...state.user,
        userPoints: {
          ...state.user.userPoints,
          userTotalPoints: points,
        },
      } as User,
    });
  };

  const updateUserStatus = (isNewUser: boolean) => {
    const user = { ...state.user };
    user.isNewUser = isNewUser;
    dispatch({
      type: "SET_USER_DATA",
      payload: {
        ...user,
      } as User,
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        cmsData,
        hasUserData,
        fetchTokenAndData,
        updateDailyLoginPointsStatus,
        updateUserStatus,
        updateUserPoints,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
