import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../ProgressBar";

interface IVoteItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  className?: string;
  hatClassName?: string;
  mediaClasssName?: string;
}

const VoteItem = ({
  data,
  className,
  hatClassName,
  mediaClasssName,
}: IVoteItemProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [elementWidth, setElementWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (elementRef.current) {
        setElementWidth(elementRef.current.clientWidth);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div
      className={clsx(
        "flex flex-row items-center gap-[12.5px] py-[12px] px-[7px] rounded-[12px] bg-tertiary",
        className
      )}
    >
      {data?.avatar && (
        <div className="relative w-[48px] h-[48px] shrink-0">
          {data?.hatIcon && (
            <img
              src={data?.hatIcon}
              alt="Avatar"
              className={clsx(
                "w-full h-full rounded-[8px] object-cover absolute left-1/2 translate-x-[-50%] top-[-100%] z-10",
                hatClassName
              )}
            />
          )}
          <img
            src={data?.avatar}
            alt="Avatar"
            className={clsx(
              "w-full h-full rounded-[8px] object-cover",
              mediaClasssName
            )}
          />
        </div>
      )}

      <div
        className="flex flex-col justify-center flex-1 gap-[8px]"
        ref={elementRef}
      >
        <div className="flex flex-row items-center justify-between">
          <span className="flex flex-row items-center font-outfit font-bold text-[16px] leading-[16px]">
            {data?.rank && (
              <span className="mr-[4px] font-outfit font-bold text-[12px] leading-[16px]">
                {data?.rank}
              </span>
            )}
            {data?.title}
          </span>

          <span className="font-pressStart font-normal text-[9px] tracking-[-0.9px] leading-[9px]">
            {data?.amount}
          </span>
        </div>

        <ProgressBar width={elementWidth} progress={data?.progress} />
      </div>

      <button
        type="button"
        className="bg-tertiary w-[40px] h-[40px] flex justify-center items-center p-[8px] rounded-[20px] shrink-0"
      >
        <i
          className={clsx(
            "votigram-icon-navbar-vote text-[24px]",
            data?.isVoted ? "text-primary" : "text-input-placeholder"
          )}
        />
      </button>
    </div>
  );
};

export default VoteItem;
