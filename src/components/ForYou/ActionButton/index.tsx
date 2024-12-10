import canvasConfetti, { CreateTypes } from "canvas-confetti";

import Confetti from "@/components/Confetti";

import { useRef } from "react";

const ActionButton = () => {
  const confettiInstance = useRef<CreateTypes | null>(null);

  const onInit = ({ confetti }: { confetti: CreateTypes }) => {
    confettiInstance.current = confetti;
  };

  const onLikeClick = () => {
    const heartShape = canvasConfetti.shapeFromPath({
      path: "M4.562 5.66c2.036-2.146 5.312-2.211 7.424-.197V20a3.124 3.124 0 0 1-2.274-.977l-5.15-5.427c-2.083-2.195-2.083-5.74 0-7.936Zm14.847 0c-2.036-2.146-5.311-2.211-7.423-.197V20c.828 0 1.655-.326 2.273-.977l5.15-5.427c2.083-2.195 2.083-5.74 0-7.936Z",
    });
    confettiInstance.current?.({
      angle: 110,
      particleCount: 15,
      spread: 70,
      origin: { y: 0.28, x: 0.88 },
      disableForReducedMotion: true,
      shapes: [heartShape],
    });

    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
  };

  return (
    <>
      <div className="flex flex-col absolute right-0 top-[320px] z-[10] right-[20px] gap-[27px]">
        <div
          role="button"
          className="flex flex-col items-center gap-1"
          onClick={onLikeClick}
        >
          <div className="flex w-[42px] h-[42px] rounded-full bg-white/25 justify-center items-center">
            <i className="votigram-icon-navbar-vote text-[32px] text-primary" />
          </div>
          <span className="text-[12px] leading-[13px]">40</span>
        </div>
        <div role="button" className="flex flex-col items-center gap-1">
          <div className="flex w-[42px] h-[42px] rounded-full bg-white/25 justify-center items-center">
            <i className="votigram-icon-chat-bubble text-[32px] text-primary" />
          </div>
          <span className="text-[12px] leading-[13px]">40</span>
        </div>
        <div role="button" className="flex flex-col items-center gap-1">
          <div className="flex w-[42px] h-[42px] rounded-full bg-white/25 justify-center items-center">
            <i className="votigram-icon-arrow-ninety-degrees text-[26px] text-primary" />
          </div>
          <span className="text-[12px] leading-[13px]">40</span>
        </div>
      </div>
      <Confetti onInit={onInit} className="absolute w-full top-0 z-[1]" />
    </>
  );
};

export default ActionButton;
