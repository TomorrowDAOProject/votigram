import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import TelegramHeader from "../TelegramHeader";
import { useUserContext } from "@/provider/UserProvider";
import { motion } from "framer-motion";
import { chainId } from "@/constants/app";
import { postWithToken } from "@/hooks/useData";
import { nftSymbol } from "@/config";
import { useWalletService } from "@/hooks/useWallet";

interface ISceneLoadingProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const SceneLoading = ({ setIsLoading }: ISceneLoadingProps) => {
  const [progress, setProgress] = useState(20);
  const [transferStatus, setTransferStatus] = useState<boolean>(false);
  const { isConnected, wallet } = useWalletService();


  const {
    hasUserData,
    user: { isNewUser },
  } = useUserContext();

  const fetchTransfer = useCallback(async () => {
    const { data } = await postWithToken("/api/app/token/transfer", {
      chainId,
      symbol: nftSymbol,
    });
    setTransferStatus(!!data.status);
  }, []);

  const fetchTransferStatus = useCallback(async () => {
    const { data } = await postWithToken("/api/app/token/transfer/status", {
      chainId,
      address: wallet?.address,
      symbol: nftSymbol,
    });

    setTransferStatus(!!data);
    if (!data) {
      fetchTransfer();
    }
  }, [wallet?.address, fetchTransfer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100; // Stop at 100%
        }
        return prevProgress + Math.random() * 10; // Increment progress by 1%
      });
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    if (isConnected && wallet?.address) {
      fetchTransferStatus();
    }
    if (hasUserData()) {
      setProgress(90);
      setIsLoading(!isNewUser);
    }
  }, [
    fetchTransferStatus,
    hasUserData,
    isConnected,
    isNewUser,
    progress,
    setIsLoading,
    transferStatus,
    wallet?.address,
  ]);

  return (
    <>
      <TelegramHeader />
      <div className="flex bg-gradient-to-t from-black to-[#9381FF] min-h-[533px] pt-telegramHeader">
        <div className="votigram-grid mt-[42px]">
          <span className="col-12 text-center font-bold text-base font-outfit">
            VOTIGRAM
          </span>
          <img
            src="https://cdn.tmrwdao.com/votigram/assets/imgs/18B98C6FFC90.webp"
            className="col-10 offset-1"
            data-testid="scene-loading-image"
          />
          <div className="flex col-12 text-[40px] flex-col text-center mb-8">
            <span className="leading-[40px] font-black font-outfit">
              YOUR <span className="text-primary">VOTE,</span>
              <br />
              YOUR <span className="text-secondary">CHOICE</span>
            </span>
          </div>
          {progress >= 90 ? (
            <button
              data-testid="cta-button"
              onClick={() => {
                setIsLoading(false);
              }}
              className="bg-primary col-10 offset-1 rounded-3xl py-2.5 leading-[14px] text-[14px] font-bold font-outfit"
            >
              Get Started!
            </button>
          ) : (
            <div
              role="progressbar"
              className="h-3 col-10 offset-1 bg-white rounded-full px-0.5 flex items-center"
            >
              <motion.div
                className="h-2 bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }} // Smooth transition for increase
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SceneLoading;
