import DailyRewards from "@/components/DailyRewards";
import { chainId } from "@/constants/app";
import useData from "@/hooks/useData";
import { useUserContext } from "@/provider/UserProvider";
import { InviteItem } from "@/types/task";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

interface IAchievementsProps {
  scrollTop: number;
}

const Achievements = ({ scrollTop }: IAchievementsProps) => {
  const {
    user: { userPoints },
  } = useUserContext();
  const [inviteList, setInviteList] = useState<InviteItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [myInvited, setMyInvited] = useState<InviteItem>();

  const PAGE_SIZE = 20;

  const { data: inviteDetail, isLoading } = useData(
    `/api/app/referral/invite-leader-board?${new URLSearchParams({
      chainId,
      skipCount: (pageIndex * PAGE_SIZE).toString(),
      maxResultCount: PAGE_SIZE.toString(),
    }).toString()}`
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
    </>
  );
};

export default Achievements;
