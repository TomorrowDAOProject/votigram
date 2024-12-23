import TelegramHeader from "@/components/TelegramHeader";
import ToggleSlider from "@/components/ToggleSlider";
import { useUserContext } from "@/provider/UserProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import Tasks from "./components/Tasks";
import Achievements from "./components/Achievements";
import { TAB_LIST } from "@/constants/navigation";
import { useAdsgram } from "@/hooks/useAdsgram";

interface IProfileProps {
  switchTab: (tab: TAB_LIST) => void;
}

const Profile = ({ switchTab }: IProfileProps) => {
  const {
    user: { userPoints },
  } = useUserContext();
  const [currentTab, setCurrentTab] = useState(0);
  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const showAd = useAdsgram({
    blockId: import.meta.env.VITE_ADSGRAM_ID.toString() || "",
    onReward: () => {},
    onError: () => {},
    onSkip: () => {},
  });

  const handleScroll = useCallback(() => {
    const scrollRef = scrollViewRef.current;
    if (scrollRef) {
      setScrollTop(
        scrollRef.scrollHeight - scrollRef.scrollTop - scrollRef.clientHeight
      );
    }
  }, [scrollViewRef]);

  useEffect(() => {
    const scrollRef = scrollViewRef.current;
    if (currentTab === 1 && scrollRef) {
      scrollRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef) {
        scrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentTab, handleScroll, scrollViewRef]);

  return (
    <>
      <TelegramHeader title="Profile" />
      <div
        className="h-screen overflow-scroll pt-telegramHeader bg-black pb-28"
        ref={scrollViewRef}
      >
        <div className="votigram-grid mt-[9px]">
          <div className="col-7 mt-[13px]">
            <span className="block font-outfit font-bold text-[20px] leading-[20px] text-white">
              Hi,&nbsp;
              {window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name ||
                " "}
            </span>
          </div>
          <div className="flex flex-col col-5 items-end gap-[6px]">
            <span className="text-[10px] leading-[11px]">
              Total earned points:
            </span>
            <span className="font-pressStart text-secondary tracking-[-1.6] text-[16px] leading-[16px]">
              {userPoints?.userTotalPoints.toLocaleString() || 0}
            </span>
          </div>

          <img
            className="col-12 rounded-[15px] my-[22px]"
            src="https://cdn.tmrwdao.com/votigram/assets/imgs/30E58CBD0603.webp"
            alt="Watch Ads"
            onClick={showAd}
          />

          <div className="col-12 mb-[22px]">
            <ToggleSlider
              current={currentTab}
              items={["Task", "Achievements"]}
              className="pt-[4px] pb-[8px] rounded-none bg-transparent border-b-[2px] border-tertiary"
              activeItemClassName="top-auto bottom-0 h-[2px] rounded-none"
              itemClassName="font-bold text-[16px] leading-[16px] font-outfit"
              onChange={setCurrentTab}
            />
          </div>

          <div className="col-12 min-w-[335px]">
            {currentTab === 0 ? (
              <Tasks switchTab={switchTab} />
            ) : (
              <Achievements scrollTop={scrollTop} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
