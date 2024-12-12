import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../ProgressBar";
import { VoteItem as VoteItemType } from "./type/index";
import canvasConfetti, { CreateTypes } from "canvas-confetti";
import Confetti from "@/components/Confetti";

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
  const confettiInstance = useRef<CreateTypes | null>(null);

  const [elementWidth, setElementWidth] = useState(0);

  const onInit = ({ confetti }: { confetti: CreateTypes }) => {
    confettiInstance.current = confetti;
  };

  const onVoteClick = () => {
    const heartShape = canvasConfetti.shapeFromPath({
      path: "M4.562 5.66c2.036-2.146 5.312-2.211 7.424-.197V20a3.124 3.124 0 0 1-2.274-.977l-5.15-5.427c-2.083-2.195-2.083-5.74 0-7.936Zm14.847 0c-2.036-2.146-5.311-2.211-7.423-.197V20c.828 0 1.655-.326 2.273-.977l5.15-5.427c2.083-2.195 2.083-5.74 0-7.936Z",
    });
    confettiInstance.current?.({
      angle: 110,
      particleCount: 15,
      spread: 70,
      origin: { y: 0.2, x: 0.88 },
      disableForReducedMotion: true,
      shapes: [heartShape],
      zIndex: 10,
    });
  };

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
        "relative flex flex-row items-center gap-[12.5px] py-[12px] px-[7px] rounded-[12px] bg-tertiary",
        className
      )}
    >
      <div
        className={clsx(
          "relative flex flex-row items-center justify-center w-[48px] h-[48px] rounded-[8px] shrink-0",
          {
            "border-2 border-lime-primary": data?.isVoted,
            "bg-gradient-to-tr from-lime-green to-lime-primary": !data.avatar,
          }
        )}
      >
        {data?.avatar ? (
          <>
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
          </>
        ) : (
          <span className="font-outfit font-bold text-[16px] leading-[16px] text-white">
            {data.title.slice(0, 1)}
          </span>
        )}
      </div>

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

      {showBtn && (
        <button
          type="button"
          className="bg-white/[.25] w-[40px] h-[40px] flex justify-center items-center p-[8px] rounded-[20px] shrink-0 z-[10]"
          onClick={onVoteClick}
        >
          <i
            className={clsx(
              "votigram-icon-navbar-vote text-[24px]",
              data?.isVoted ? "text-lime-green" : "text-lime-primary"
            )}
          />
        </button>
      )}
      <Confetti onInit={onInit} className="absolute w-full top-0" />
    </div>
  );
};

export default VoteItem;
