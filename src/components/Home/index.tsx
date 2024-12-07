import { useState } from "react";
import AppList from "../AppList";
import CategoryPillList from "../CategoryPillList";
import DiscoveryHiddenGems from "../DiscoveryHiddenGems";
import PointsCounter from "../PointsCounter";
import TelegramHeader from "../TelegramHeader";
import TopVotedApps from "../TopVotedApps";
import { useUserContext } from "@/provider/UserProvider";
import Modal from "../Modal";
import useData from "@/hooks/useData";

const DAILY_REWARDS = [2000, 2000, 2000, 2000, 2000, 2000, 5000];

const Home = () => {
  const {
    user: { userPoints },
    updateDailyLoginPointsStatus,
  } = useUserContext();
  const [showDailyReward, setShowDailyReward] = useState(
    !userPoints?.dailyLoginPointsStatus || false
  );
  const { data: madeForYouResult } = useData(
    "/api/app/user/homepage/made-for-you?chainId=tDVW"
  );

  const { data: votedAppResult } = useData(
    "/api/app/user/homepage?chainId=tDVW"
  );
  const [isSearching, setIsSearching] = useState(false);

  return (
    <>
      <TelegramHeader title={isSearching ? "Discover" : ""} />
      <div className="h-screen overflow-scroll pt-telegramHeader">
        <div className="font-outfit votigram-grid mt-[9px]">
          <div className="col-12 mb-[11px]">
            {isSearching ? (
              <i
                className="votigram-icon-back text-[19px] leading-[18px]"
                onClick={() => {
                  setIsSearching(false);
                }}
              />
            ) : (
              <span className="font-bold text-[20px] leading-[20px]">
                Hi,
                {window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name ||
                  " "}
                🥀
              </span>
            )}
          </div>
          <div className="col-12 bg-input gap-2 h-[41px] px-4 flex items-center rounded-3xl">
            <i className="votigram-icon-search text-input-placeholder" />
            <input
              className="w-full bg-transparent placeholder:leading-[19.6px] text-[14px] placeholder:text-input-placeholder placeholder:font-questrial"
              placeholder="Search..."
              onFocus={() => {
                setIsSearching(true);
              }}
            />
          </div>
        </div>
        <CategoryPillList />
        <div className="mb-[22px] votigram-grid gap-[9px]">
          <div className="col-6 p-[13px] flex flex-col gap-[7px] relative h-[230px] bg-secondary text-black rounded-[18px]">
            <img
              src="https://cdn.tmrwdao.com/votigram/assets/imgs/3F37AB0AEBE1.webp"
              className="left-0 bottom-0 absolute w-[118px]"
            />
            <div className="flex bg-[#00000038] rounded-full w-[32px] aspect-square justify-center items-center">
              <i className="votigram-icon-chat-bubble text-[20px] text-white opacity-40" />
            </div>
            <span className="text-[12px] leading-[13px] font-normal">
              Community Leaderboard
            </span>
            <span className="font-outfit text-xl font-bold w-[127px] leading-[20px]">
              Vote for your favourite TMAs
            </span>
          </div>
          <div className="col-6 h-[230px] flex flex-col gap-[10px]">
            <div className="col-12 p-[13px] flex-1 bg-tertiary rounded-[18px]">
              <div className="flex bg-[#00000038] rounded-full w-[32px] aspect-square justify-center items-center">
                <i className="votigram-icon-navbar-for-you text-[20px] text-white opacity-40" />
              </div>
              <span className="text-[12px] text-white leading-[13px] font-normal">
                Browse TMAs
              </span>
            </div>
            <div className="col-12 p-[13px] flex-1 bg-primary rounded-[18px] relative">
              <img
                src="https://cdn.tmrwdao.com/votigram/assets/imgs/E0454AB5B2E6.webp"
                className="absolute right-[25px] top-0 w-[45px]"
              />
              <div className="flex bg-[#00000038] rounded-full w-[32px] aspect-square justify-center items-center">
                <i className="votigram-icon-profile text-[20px] text-white opacity-40" />
              </div>
              <span className="text-[12px] text-white leading-[13px] font-normal">
                My Profile
              </span>
              <div className="flex gap-1 absolute bottom-[12px] items-end">
                <PointsCounter
                  end={userPoints?.userTotalPoints || 0}
                  duration={1000}
                />
                <span className="text-[11px] text-white leading-[13px] font-normal">
                  points
                </span>
              </div>
            </div>
          </div>
        </div>
        <TopVotedApps items={votedAppResult?.weeklyTopVotedApps} />
        <DiscoveryHiddenGems item={votedAppResult?.discoverHiddenGems} />
        <AppList title="Made For You" items={madeForYouResult?.data} />
      </div>
      <Modal isVisible={showDailyReward} rootClassName="p-5">
        <div className="col-12 items-center flex flex-col gap-[8px] mb-7">
          <span className="font-outfit text-[20px] leading-[20px] font-bold">
            Daily Rewards
          </span>
          <span className="text-[12px] leading-[13px]">
            Log in everyday to earn extra points!
          </span>
        </div>
        <div className="col-12 gap-[9px] flex flex-wrap justify-center mb-7">
          {DAILY_REWARDS.map((item, index) => (
            <div className="flex flex-col bg-tertiary w-[67px] rounded-[8px] gap-[15px] justify-center aspect-square items-center">
              <span className="text-[9px] leading-[10px]">Day {index + 1}</span>
              {(userPoints?.consecutiveLoginDays || 1) >= index + 1 ? (
                <div className="flex w-[20px] h-[20px] items-center justify-center rounded-full bg-primary">
                  <i className="votigram-icon-tick text-[10px]" />
                </div>
              ) : (
                <span className="text-[14px] leading-[14px] text-secondary font-bold font-outfit">
                  + {item.toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>
        <button className="bg-secondary text-black text-[14px] leading-[14px] font-outfit font-bold py-[10px] w-full rounded-[24px] mb-2">
          Watch Ads To Double The Point
        </button>
        <button
          onClick={() => {
            setShowDailyReward(false);
            updateDailyLoginPointsStatus(true);
          }}
          className="bg-primary text-white text-[14px] leading-[14px] font-outfit font-bold py-[10px] w-full rounded-[24px]"
        >
          Claim Today's Reward
        </button>
      </Modal>
    </>
  );
};

export default Home;
