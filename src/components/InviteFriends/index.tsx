import { useMemo, useRef } from "react";
import clsx from "clsx";

interface IInviteFriendsStatusProps {
  value: number;
}

const InviteFriendsStatus = ({ value }: IInviteFriendsStatusProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const total = useMemo(() => {
    if (value % value === 0) {
      return value + 20;
    }
    return Math.ceil(value / 20) * 20;
  }, [value]);

  const progress = useMemo(() => {
    const percentage = (value / total) * 100;
    return percentage < 100 ? percentage : 100;
  }, [value, total]);

  return (
    <div
      ref={elementRef}
      className="p-[1px] rounded-[18px] w-full !content-[''] bg-gradient-to-r from-lime-primary to-lime-green"
    >
      <div className="px-5 pt-[22px] pb-4 bg-black rounded-[18px]">
        <div className="flex items-start justify-between mb-[14px]">
          <span className="whitespace-pre-wrap -tracking-[0.5px] font-bold font-outfit text-[28px] leading-[28px] text-white">
            {"Invite friends\n& get points!"}
          </span>
          <span className="mt-2 text-lg font-normal text-[13px] leading-[15.6px] text-lime-green">
            +{(1000).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between mb-[14px] gap-5">
          <div className="flex-1 h-[10px] shrink-0 bg-white rounded-[5px]">
            {progress && (
              <div
                className={clsx(
                  "h-[10px] bg-gradient-to-r from-lime-green to-lime-primary rounded-[5px]"
                )}
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
          <span className="font-outfit font-bold text-[14px] leading-[14px] text-white shrink-0">
            {value}/{total}
          </span>
        </div>
        <button
          type="button"
          className="w-full  bg-primary rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[14px] text-white"
        >
          Invite friends
        </button>
      </div>
    </div>
  );
};

export default InviteFriendsStatus;
