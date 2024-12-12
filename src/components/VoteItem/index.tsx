import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../ProgressBar";
import { VoteItem as VoteItemType } from "./type/index";

interface IVoteItemProps {
  data: VoteItemType;
  showHat?: boolean;
  showBtn?: boolean;
  className?: string;
  hatClassName?: string;
  imgClassName?: string;
}

const VoteItem = ({
  data,
  showHat,
  showBtn,
  className,
  hatClassName,
  imgClassName,
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
  }, []);

  return (
    <div
      className={clsx(
        "flex flex-row items-center gap-[12.5px] py-[12px] px-[7px] rounded-[12px] bg-tertiary",
        className
      )}
    >
      {data?.avatar && (
        <div className={clsx('relative w-[48px] h-[48px] rounded-[8px] shrink-0', { 'border-2 border-lime-primary': data?.isVoted })} >
          {showHat && (
            <img
              src="https://cdn.tmrwdao.com/votigram/assets/imgs/246CBC3C5F73.webp"
              alt="Avatar"
              className={clsx(
                "w-[20px] h-[14px] object-contain absolute left-1/2 translate-x-[-50%] top-[-14px] z-10",
                hatClassName
              )}
            />
          )}
          <img
            src={data?.avatar}
            alt="Avatar"
            className={clsx(
              "w-full h-full rounded-[8px] object-cover",
              imgClassName
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

          <span className="font-pressStart font-normal text-[9px] tracking-[-0.9px] leading-[9px] text-lime-green">
            {data?.amount.toLocaleString()}
          </span>
        </div>

        <ProgressBar width={elementWidth} progress={data?.progress} />
      </div>

      {showBtn && <button
        type="button"
        className="bg-white25 w-[40px] h-[40px] flex justify-center items-center p-[8px] rounded-[20px] shrink-0"
      >
        <i
          className={clsx(
            "votigram-icon-navbar-vote text-[24px]",
            data?.isVoted ? "text-lime-green" : "text-lime-primary"
          )}
        />
      </button>}
    </div>
  );
};

export default VoteItem;
