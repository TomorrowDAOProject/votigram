import { DAILY_REWARDS } from "@/constants/discover";
import { UserPoints } from "@/provider/types/UserProviderType";

interface IDailyRewardsProps {
  userPoints: UserPoints | null;
}

const DailyRewards = ({ userPoints }: IDailyRewardsProps) => {
  return (
    <>
      <div className="col-12 items-center flex flex-col gap-[8px] mb-7">
        <span className="font-outfit text-[20px] leading-[20px] font-bold">
          Daily Rewards
        </span>
        <span className="text-[12px] leading-[13px]">
          Log in everyday to earn extra points!
        </span>
      </div>
      <div className="col-12 gap-[9px] flex flex-wrap justify-center">
        {DAILY_REWARDS.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-tertiary w-[67px] rounded-[8px] gap-[15px] justify-center aspect-square items-center"
          >
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
    </>
  );
};

export default DailyRewards;
