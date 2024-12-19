import BackBtn from "@/components/BackBtn";
import Loading from "@/components/Loading";
import VoteItem from "@/components/VoteItem";
import { chainId } from "@/constants/app";
import useData from "@/hooks/useData";
import { IPollDetail } from "@/types/app";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PollDetail = () => {
  const { proposalId } = useParams();
  const [canVote, setCanVote] = useState(false);
  const [pollDeta, setPollDeta] = useState<IPollDetail | null>(null);

  const { data, isLoading } = useData(
    proposalId
      ? `/api/app/ranking/detail?${new URLSearchParams({
          chainId,
          proposalId,
        }).toString()}`
      : null
  );

  useEffect(() => {
    if (data) {
      setPollDeta(data);
      setCanVote(data.canVoteAmount > 0);
    }
  }, [data]);

  if (!pollDeta && isLoading) {
    return <Loading className="h-screen w-screen" />;
  }

  return (
    <div className="pt-telegramHeader bg-black w-screen h-screen overflow-y-auto px-5">
      <div className="flex justify-between items-end pt-3 pb-4 border-b-[1px] border-tertiary">
        <BackBtn />

        <div className="flex flex-col col-5 items-end gap-[6px]">
          <span className="text-[10px] leading-[11px] text-white">
            Total earned points:
          </span>
          <span className="font-pressStart text-secondary tracking-[-1.6] text-[16px] leading-[16px]">
            {pollDeta?.userTotalPoints.toLocaleString() || 0}
          </span>
        </div>
      </div>
      <div className="pt-[17px] pb-[22px]">
        <span className="block text-[22px] font-bold text-center leading-[22px] text-white mb-[18px]">
          {pollDeta?.proposalTitle}
        </span>

        {pollDeta?.bannerUrl && (
          <img
            src={pollDeta?.bannerUrl}
            className="w-full rounded-[12px]"
            alt="Banner"
          />
        )}

        <div className="flex flex-row items-center justify-between mt-[18px] mb-[14px]">
          <span className="font-normal text-white text-[13px] leading-[15.6px]">
            Duration:{" "}
            {`${dayjs(pollDeta?.startTime).format("DD MMM YYYY")} - ${dayjs(
              pollDeta?.endTime
            ).format("DD MMM YYYY")}`}
          </span>
          <div className="z-10">
            <i className="votigram-icon-share text-[28px] text-input-placeholder" />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          {pollDeta?.rankingList?.map((vote, index) => (
            <VoteItem
              key={`${vote.alias}_${index}`}
              data={vote}
              proposalId={proposalId || ""}
              className="w-full"
              canVote={canVote}
              onVoted={() => setCanVote(false)}
              isFirst={index === 0}
              showBtn
            />
          ))}
        </div>

        <span className="block text-center font-normal text-[12px] leading-[13.2px] text-input-placeholder mt-[18px]">
          First Vote: Earn 1,000 Points!
        </span>
      </div>
    </div>
  );
};

export default PollDetail;
