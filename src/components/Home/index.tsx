import { useEffect, useRef, useState } from "react";
import AppList from "../AppList";
import CategoryPillList from "../CategoryPillList";
import DiscoveryHiddenGems from "../DiscoveryHiddenGems";
import PointsCounter from "../PointsCounter";
import TelegramHeader from "../TelegramHeader";
import TopVotedApps from "../TopVotedApps";
import { useUserContext } from "@/provider/UserProvider";
import Modal from "../Modal";
import useData, { postWithToken } from "@/hooks/useData";
import SearchPanel from "../SearchPanel";
import { VoteApp } from "@/types/app";
import { chainId } from "@/constants/app";
import DailyRewards from "../DailyRewards";
import { APP_CATEGORY, DISCOVER_CATEGORY } from "@/constants/discover";
import { useAdsgram } from "@/hooks/useAdsgram";
import { TAB_LIST } from "@/constants/navigation";
import useSetSearchParams from "@/hooks/useSetSearchParams";
import { VOTE_TABS } from "@/constants/vote";

interface IHomeProps {
  onAppItemClick: (item?: VoteApp) => void;
  recommendList: VoteApp[];
  switchTab: (tab: TAB_LIST) => void;
}

const PAGE_SIZE = 20;

const Home = ({ onAppItemClick, switchTab, recommendList }: IHomeProps) => {
  const {
    user: { userPoints },
    updateUserPoints,
    updateDailyLoginPointsStatus,
  } = useUserContext();

  const [isSearching, setIsSearching] = useState(false);
  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  const [searchList, setSearchList] = useState<VoteApp[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [newAmount, setNewAmount] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [keyward, setKeyward] = useState("");
  const [category, setCategory] = useState<APP_CATEGORY>(APP_CATEGORY.ALL);
  const [adPrams, setAdParams] = useState<{
    timeStamp?: number;
    signature?: string;
  }>({});
  const { updateQueryParam } = useSetSearchParams();

  const { data: searchData, isLoading } = useData(
    isSearching && (category || keyward)
      ? `/api/app/discover/app-list?${new URLSearchParams({
          chainId,
          category: category.toString(),
          search: keyward,
          skipCount: (pageIndex * PAGE_SIZE).toString(),
          maxResultCount: PAGE_SIZE.toString(),
        }).toString()}`
      : null
  );

  const { data: madeForYouResult } = useData(
    "/api/app/user/homepage/made-for-you?chainId=tDVW"
  );

  const { data: votedAppResult } = useData(
    "/api/app/user/homepage?chainId=tDVW"
  );

  useEffect(() => {
    const { data, totalCount } = searchData || {};
    if (data && Array.isArray(data)) {
      setSearchList((prev) => (pageIndex === 0 ? data : [...prev, ...data]));
      setNoMore(data.length < PAGE_SIZE);
      if (category === APP_CATEGORY.NEW) {
        setNewAmount(totalCount || 0);
      }
    }
  }, [category, pageIndex, searchData]);

  const onClaimClick = async () => {
    try {
      const result = await postWithToken("/api/app/user/login-points/collect", {
        chainId,
        ...adPrams,
      });
      if (result?.data?.userTotalPoints) {
        updateDailyLoginPointsStatus(result?.data?.userTotalPoints);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showAd = useAdsgram({
    blockId: import.meta.env.VITE_ADSGRAM_ID.toString() || "",
    onReward: updateUserPoints,
    onError: () => {},
    onSkip: () => {},
    onFinish: (timeStamp, signature) => setAdParams({ timeStamp, signature }),
  });

  useEffect(() => {
    const scrollRef = scrollViewRef.current;

    const handleScroll = () => {
      const scrollRef = scrollViewRef.current;
      if (!scrollRef) return;
      if (
        scrollRef.scrollHeight - scrollRef.scrollTop - scrollRef.clientHeight <
          50 &&
        !noMore &&
        !isLoading
      ) {
        setPageIndex((page) => page + 1);
      }
    };

    if (scrollRef) {
      scrollRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef) {
        scrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoading, noMore, scrollViewRef]);

  return (
    <>
      {isSearching && <TelegramHeader title="Discover" />}
      <div
        className="h-screen overflow-x-scroll pt-telegramHeader bg-black"
        ref={scrollViewRef}
      >
        <div className="font-outfit votigram-grid mt-[9px]">
          <div className="col-12 mb-[11px]">
            {isSearching ? (
              <i
                className="votigram-icon-back text-[19px] leading-[18px] text-white"
                onClick={() => {
                  setCategory(APP_CATEGORY.ALL);
                  setIsSearching(false);
                }}
              />
            ) : (
              <span className="font-bold text-[20px] leading-[20px] text-white">
                Hi,&nbsp;
                {window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name ||
                  " "}
              </span>
            )}
          </div>
          <div className="col-12 bg-input gap-2 h-[41px] px-4 flex items-center rounded-3xl">
            <i className="votigram-icon-search text-input-placeholder" />
            <input
              className="w-full bg-transparent text-white outline-none appearence-none placeholder:leading-[19.6px] text-[14px] placeholder:text-input-placeholder placeholder:font-questrial"
              placeholder="Search..."
              onChange={(e) => {
                setPageIndex(0);
                setKeyward(e.target.value);
              }}
              maxLength={200}
              onFocus={() => {
                setIsSearching(true);
              }}
            />
          </div>
          {isSearching && keyward.length >= 200 && (
            <span className="mt-1 pl-4 block text-[13px] font-normal leading-[16px] text-danger whitespace-nowrap">
              Should contain no more than 200 characters.
            </span>
          )}
        </div>
        <CategoryPillList
          value={category}
          amount={
            isSearching && category === APP_CATEGORY.NEW ? newAmount : undefined
          }
          items={DISCOVER_CATEGORY}
          onChange={(value) => {
            setPageIndex(0);
            setCategory(value);
            setIsSearching(value !== APP_CATEGORY.ALL);
          }}
        />
        {isSearching ? (
          <SearchPanel
            recommendList={
              searchList.length > 0 || keyward?.length > 0
                ? searchList
                : recommendList
            }
            updateUserPoints={updateUserPoints}
            onAppItemClick={onAppItemClick}
          />
        ) : (
          <>
            <div className="mb-[22px] votigram-grid gap-[9px]">
              <div
                className="col-6 p-[13px] flex flex-col gap-[7px] relative h-[230px] bg-secondary text-black rounded-[18px]"
                onClick={() => {
                  updateQueryParam([
                    {
                      key: "vote_tab",
                      value: VOTE_TABS.TMAS,
                    },
                    {
                      key: "tmas",
                      value: "1",
                    },
                  ], true);
                  switchTab(TAB_LIST.VOTE);
                }}
              >
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
                <div
                  className="col-12 p-[13px] flex-1 bg-tertiary rounded-[18px]"
                  onClick={() => onAppItemClick()}
                >
                  <div className="flex bg-[#00000038] rounded-full w-[32px] aspect-square justify-center items-center">
                    <i className="votigram-icon-navbar-for-you text-[20px] text-white opacity-40" />
                  </div>
                  <span className="text-[12px] text-white leading-[13px] font-normal">
                    Browse TMAs
                  </span>
                </div>
                <div
                  className="col-12 p-[13px] flex-1 bg-primary rounded-[18px] relative"
                  onClick={() => switchTab(TAB_LIST.PEN)}
                >
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
                      pts
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <TopVotedApps
              onAppItemClick={onAppItemClick}
              items={votedAppResult?.weeklyTopVotedApps}
            />
            <DiscoveryHiddenGems
              onAppItemClick={onAppItemClick}
              item={votedAppResult?.discoverHiddenGems}
            />
            <AppList
              onAppItemClick={onAppItemClick}
              title="Made For You"
              items={madeForYouResult?.data}
            />
          </>
        )}
      </div>
      <Modal
        isVisible={!userPoints?.dailyLoginPointsStatus}
        rootClassName="p-5"
      >
        <DailyRewards userPoints={userPoints} />
        <button
          className="mt-7 bg-secondary text-black text-[14px] leading-[14px] font-outfit font-bold py-[10px] w-full rounded-[24px] mb-2"
          onClick={showAd}
        >
          Watch Ads To Double The Point
        </button>
        <button
          onClick={onClaimClick}
          className="bg-primary text-white text-[14px] leading-[14px] font-outfit font-bold py-[10px] w-full rounded-[24px]"
        >
          Claim Today's Reward
        </button>
      </Modal>
    </>
  );
};

export default Home;
