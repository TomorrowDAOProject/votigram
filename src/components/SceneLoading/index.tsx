import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUserContext } from "@/provider/UserProvider";
import { motion } from "framer-motion";

interface ISceneLoadingProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const SceneLoading = ({ setIsLoading }: ISceneLoadingProps) => {
  const [progress, setProgress] = useState(20);

  const {
    hasUserData,
    user: { isNewUser },
  } = useUserContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100; // Stop at 100%
        }
        return prevProgress + Math.random() * 20; // Increment progress by 1%
      });
    }, 3000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    if (hasUserData()) {
      setProgress(89);
    }
  }, [hasUserData]);

  useEffect(() => {
    if (progress >= 90) {
      // setIsLoading(isNewUser);
    }
  }, [isNewUser, progress, setIsLoading]);

  return (
    <>
      <div className="bg-gradient-to-t from-black to-[#9381FF] min-h-[533px]">
        <div className="pt-[42px] h-screen">
          <span className="block text-center font-bold text-base font-outfit">
            VOTIGRAM
          </span>
          <img
            src="https://cdn.tmrwdao.com/votigram/assets/imgs/18B98C6FFC90.webp"
            className="mt-[5px] mx-auto mb-[25px] h-[56vh]"
            data-testid="scene-loading-image"
          />
          <div className="flex col-12 text-[40px] flex-col text-center mb-8">
            <span className="leading-[40px] font-black font-outfit">
              YOUR <span className="text-primary">VOTE,</span>
              <br />
              YOUR <span className="text-secondary">CHOICE</span>
            </span>
          </div>
          <div className="px-[49px]">
            {progress >= 90 ? (
              <button
                data-testid="cta-button"
                onClick={() => {
                  setIsLoading(false);
                }}
                className="bg-primary w-full rounded-3xl py-2.5 leading-[14px] text-[14px] font-bold font-outfit"
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
      </div>
    </>
  );
};

export default SceneLoading;
