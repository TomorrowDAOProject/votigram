import { VoteApp } from "@/types/app";
import "./index.css";

interface ITopVoteApps {
  items: VoteApp[];
}

const TopVotedApps = ({ items }: ITopVoteApps) => {
  return (
    <div className="flex flex-col gap-[12px] mb-[22px]">
      <span className="px-[20px] font-bold font-outfit text-[18px] leading-[18px]">
        Weekly Top Voted Apps
      </span>
      <div className="top-voted-app-list col-12 overflow-scroll flex flex-nowrap font-questrial">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col p-[7px] rounded-[10px] bg-tertiary item min-h-[77px] min-w-[106px]"
          >
            <img
              className="rounded-[6px] w-[30px] aspect-square"
              src={item.imageUrl}
              alt={item.title}
            />
            <div className="flex flex-col bottom-[7px] absolute">
              <i className="votigram-icon-arrow text-secondary text-[10px] leading-[10px]" />
              <div className="flex gap-0.5 items-end">
                <span
                  data-testid={`${item.title}-point`}
                  className="font-outfit text-[12px] leading-[12px] font-bold"
                >
                  {(item.points || 0).toLocaleString()}
                </span>
                <span className="text-[9px] font-normal leading-[10px]">
                  pts
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopVotedApps;
