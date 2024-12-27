import ToggleSlider from "../ToggleSlider";
import { useUserContext } from "@/provider/UserProvider";
import TMAs from "../TMAs";
import { useCallback, useEffect, useRef, useState } from "react";
import Community from "../Community";
import TelegramHeader from "../TelegramHeader";
import Countdown from "../Countdown";
import dayjs from "dayjs";
import { VOTE_TABS } from "@/constants/vote";
import { VoteApp } from "@/types/app";
import useSetSearchParams from "@/hooks/useSetSearchParams";

interface IVoteProps {
  onAppItemClick: (item: VoteApp) => void;
}

const TABS = [VOTE_TABS.TMAS, VOTE_TABS.COMMUNITY];

const Vote = ({ onAppItemClick }: IVoteProps) => {
  const {
    user: { userPoints },
  } = useUserContext();
  const { querys, updateQueryParam } = useSetSearchParams();
  const activeTab = querys.get("vote_tab");
  const [currnetTab, setCurrentTab] = useState(activeTab || VOTE_TABS.TMAS);
  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [tmaTab, setTMATab] = useState(0);

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
    if (scrollRef) {
      scrollRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef) {
        scrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, scrollViewRef]);

  const getRemainingSeconds = () => {
    const now = dayjs();
    const endOfWeek = dayjs().day(7).startOf("day");
    const secondsRemainingInWeek = endOfWeek.diff(now, "seconds");
    setSeconds(secondsRemainingInWeek);
  };

  const onTabChange = (index: number) => {
    setCurrentTab(index === 0 ? VOTE_TABS.TMAS : VOTE_TABS.COMMUNITY);
    updateQueryParam(
      "vote_tab",
      index === 0 ? VOTE_TABS.TMAS : VOTE_TABS.COMMUNITY
    );
  };

  return (
    <>
      {tmaTab === 1 && (
        <TelegramHeader
          title={
            <Countdown initialTime={seconds} onFinish={getRemainingSeconds} />
          }
        />
      )}
      <div
        className="h-screen overflow-scroll pt-telegramHeader bg-black"
        ref={scrollViewRef}
      >
        <div className="votigram-grid">
          <div className="col-7 h-7 mt-3">
            <ToggleSlider
              current={TABS.findIndex((tab) => tab === currnetTab)}
              items={TABS}
              onChange={onTabChange}
            />
          </div>
          <div className="flex flex-col col-5 items-end gap-[6px]">
            <span className="text-[10px] leading-[11px] text-white">
              Total earned points:
            </span>
            <span className="font-pressStart text-secondary tracking-[-1.6] text-[16px] leading-[16px]">
              {userPoints?.userTotalPoints.toLocaleString() || 0}
            </span>
          </div>
          <div className="mt-8 col-12">
            {currnetTab === VOTE_TABS.TMAS ? (
              <TMAs
                scrollTop={scrollTop}
                onTabChange={setTMATab}
                onAppItemClick={onAppItemClick}
              />
            ) : (
              <Community scrollTop={scrollTop} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vote;
