import DailyRewards from "@/components/DailyRewards";
import Drawer from "@/components/Drawer";
import { chainId } from "@/constants/app";
import useData from "@/hooks/useData";
import { useUserContext } from "@/provider/UserProvider";
import { InviteItem, ReferralTimeConfig } from "@/types/task";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Picker } from "react-mobile-style-picker";
import "react-mobile-style-picker/dist/index.css";
import "./index.css";
import Loading from "@/components/Loading";

interface IAchievementsProps {
  scrollTop: number;
}

const Achievements = ({ scrollTop }: IAchievementsProps) => {
  const {
    user: { userPoints },
  } = useUserContext();
  const [refConfig, setRefConfig] = useState<ReferralTimeConfig[]>([]);
  const [duration, setDuration] = useState<ReferralTimeConfig>();
  const [tempDuration, setTempDuration] = useState<ReferralTimeConfig | null>();
  const [isVisible, setIsVisible] = useState(false);
  const [inviteList, setInviteList] = useState<InviteItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [myInvited, setMyInvited] = useState<InviteItem>();

  const PAGE_SIZE = 20;

  const { data: referralConfig } = useData(
    `/api/app/referral/config?${new URLSearchParams({
      chainId,
    }).toString()}`
  );

  const { data: inviteDetail, isLoading } = useData(
    duration
      ? `/api/app/referral/invite-leader-board?${new URLSearchParams({
          chainId,
          startTime: duration?.startTime?.toString(),
          endTime: duration?.startTime.toString(),
          skipCount: (pageIndex * PAGE_SIZE).toString(),
          maxResultCount: PAGE_SIZE.toString(),
        }).toString()}`
      : null
  );

  useEffect(() => {
    const { data: inviteList, me } = inviteDetail || {};
    if (inviteList && Array.isArray(inviteList)) {
      setInviteList((prev) =>
        pageIndex === 0 ? inviteList : [...prev, ...inviteList]
      );
      setHasMore(inviteList?.length >= PAGE_SIZE);
    }

    if (me) {
      setMyInvited(me);
    }
  }, [inviteDetail, pageIndex]);

  useEffect(() => {
    if (scrollTop && scrollTop < 50 && hasMore && !isLoading) {
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    }
  }, [hasMore, isLoading, scrollTop]);

  useEffect(() => {
    const { config } = referralConfig || {};
    if (config && Array.isArray(config)) {
      setRefConfig(config);
      if (config[0]) {
        setDuration(config[0]);
      }
    }
  }, [referralConfig]);

  const handleConfirm = () => {
    if (tempDuration) {
      setDuration(tempDuration);
    }
    setIsVisible(false);
  };

  const onClose = () => {
    setIsVisible(false);
    setTempDuration(null);
  };

  return (
    <>
      <div className="py-6 px-5 bg-modal-background rounded-[15px] mb-[22px]">
        <DailyRewards userPoints={userPoints} />
      </div>
      <span className="block font-bold font-outfit text-[20px] text-white leading-[20px]">
        Referral Leaderboard
      </span>
      <span className="block font-normal text-[14px] text-white leading-[16px] my-3">
        Climb the Referral Leaderboard by inviting friends!
      </span>
      <div
        role="button"
        aria-label="select date"
        className="relative py-[12px] pl-[14px] pr-[40px] border border-tertiary rounded-[10px]"
        onClick={() => setIsVisible(true)}
      >
        <span className="block min-w-[50px] h-[20px] font-normal text-[14px] text-input-placeholder leading-[20px]">
          {duration && dayjs(duration?.startTime).format("DD MMM YYYY")} -{" "}
          {duration && dayjs(duration.endTime).format("DD MMM YYYY")}
        </span>
        <i className="absolute top-1/2 right-[14px] -translate-y-1/2 votigram-icon-calendar text-input-placeholder text-[18px]" />
      </div>

      <div className="mt-3 p-4 rounded-[15px] bg-modal-background">
        <div className="flex flex-row items-center justify-between gap-[15px] mb-[3px] font-normal text-[12px] text-white leading-[13.2px]">
          <span className="w-[40px] shrink-0">Rank</span>
          <div className="flex-1 flex flex-row justify-between items-center">
            <span className="max-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap">
              Name
            </span>
            <span className="block w-[36px] text-right shrink-0">Invited</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-[15px] py-2 border-b border-tertiary font-normal text-[12px] text-white leading-[13.2px]">
          <span className="w-[40px] shrink-0 flex-none">
            {myInvited?.rank || "--"}
          </span>
          <div className="flex items-center gap-[13px] flex-grow min-w-0">
            <div className="w-[32px] h-[32px] rounded-[16px] bg-avatar-background shrink-0" />
            <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-grow min-w-0 text-[14px] font-normal leading-[16.8px]">
              {myInvited?.inviter ||
                window?.Telegram?.WebApp?.initDataUnsafe?.user?.first_name ||
                " "}
              <span className="inline-block h-[12px] px-1 leading-[12px] text-[11px] font-normal leading-[14.4px] text-tertiary bg-lime-green rounded-[5px] ml-[4px]">
                ME
              </span>
            </span>
          </div>
          <span className="block w-[36px] h-[32px] leading-[32px] text-right shrink-0 font-pressStart text-[10px] -tracking-[1px]">
            {myInvited?.inviteAndVoteCount || 0}
          </span>
        </div>
        {inviteList.map((item) => (
          <div
            className="flex flex-row items-center justify-between gap-[15px] py-2 border-b border-tertiary font-normal text-[12px] text-white leading-[13.2px]"
            key={item.inviter}
          >
            <span className="w-[40px] shrink-0 flex-none">
              {item?.rank || "--"}
            </span>
            <div className="flex items-center gap-[13px] flex-grow min-w-0">
              <div className="w-[32px] h-[32px] rounded-[16px] bg-avatar-background shrink-0" />
              <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-grow min-w-0 text-[14px] font-normal leading-[16.8px]">
                {item?.inviter || ""}
              </span>
            </div>
            <span className="block w-[36px] h-[32px] leading-[32px] text-right shrink-0 font-pressStart text-[10px] -tracking-[1px]">
              {item?.inviteAndVoteCount || 0}
            </span>
          </div>
        ))}

        {isLoading && <Loading />}
      </div>
      <Drawer
        isVisible={isVisible}
        direction="bottom"
        canClose
        onClose={onClose}
        rootClassName="px-[16px] pt-5 pb-7 bg-tertiary"
      >
        <div className="flex flex-row">
          <Picker
            size={5}
            itemSize={40}
            itemWeight={80}
            value={tempDuration}
            className="time-picker"
            onChange={setTempDuration}
            data-testid="hours-picker"
          >
            {refConfig.map((item) => (
              <Picker.Item
                className="text-[15px]"
                value={item}
                key={item.startTime}
                data-testid={`hour-${item}`}
              >
                {dayjs(item.startTime).format("DD MMM YYYY")} -{" "}
                {dayjs(item.endTime).format("DD MMM YYYY")}
              </Picker.Item>
            ))}
          </Picker>
        </div>
        <button
          type="button"
          className="w-full my-4 mx-[2.5px] bg-primary rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[25px] text-white"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </Drawer>
    </>
  );
};

export default Achievements;
