import { VoteSection as VoteSectionType } from "@/types/app";
import dayjs from "dayjs";
import Tag from "../Tag";
import clsx from "clsx";

interface IVoteSctionProps {
  data: VoteSectionType;
  className?: string;
}

const VoteSection = ({ data, className }: IVoteSctionProps) => {
  return (
    <div
      className={clsx(
        "relative pt-[21px] px-5 rounded-[18px] bg-dark-gray",
        className
      )}
    >
      <span className="text-white font-bold text-[16px] leading-[16px] font-outfit max-h-[32px] line-clamp-2">
        {data.title}
      </span>
      <div className="flex flex-row items-center justify-between my-[13px]">
        <span className="font-normal text-white text-[12px] leading-[13.2px]">
          Duration:{" "}
          {`${dayjs(data.startTime).format("DD MMM YYYY")} - ${dayjs(
            data.endTime
          ).format("DD MMM YYYY")}`}
        </span>
        <span className="font-normal text-white text-[11px] leading-[13.2px]">
          Total votes:{" "}
          <span className="text-lime-green">{data.totalVotes || 0}</span>
        </span>
      </div>
      {data.bannerUrl && (
        <img
          className="w-full h-[98px] rounded-[12px] object-cover"
          src={data.bannerUrl}
          alt="Banner"
        />
      )}
      <div className="flex flex-row items-center justify-between mt-[13px] pt-[7px] pb-[8px] border-t-[1px] border-solid border-tertiary">
        <div className="flex flex-row items-center justify-center gap-[6px]">
          {data.avatarUrl ? (
            <img
              className="w-[16px] h-[16px] object-cover rounded-[8px]"
              src={data.avatarUrl}
              alt="Avatar"
            />
          ) : (
            <div className="flex items-center justify-center bg-white/[.25] w-[16px] h-[16px] rounded-[8px]">
              <i className="votigram-icon-profile text-[10px] leading-[10px] text-white/[.4]" />
            </div>
          )}
          <span className="font-normal text-white text-[11px] leading-[13.2px]">
            {data.creator}
          </span>
        </div>

        <i className="votigram-icon-arrow-go text-[8px] leading-[8px] text-lime-primary" />
      </div>

      <Tag text="Trading" className="absolute top-[-3px] right-[-3px]" />
    </div>
  );
};

export default VoteSection;