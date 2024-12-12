/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

import { CreateTypes } from "canvas-confetti";

import { postWithToken } from "@/hooks/useData";
import Confetti from "@/components/Confetti";
import { chainId } from "@/constants/app";
import { VoteApp } from "@/types/app";
import { HEART_SHAPE } from "@/constants/canvas-confetti";

interface IActionButton {
  item: VoteApp;
  totalLikes: number;
  totalComments: number;
  totalOpens: number;
  updateOpenAppClick: (alias: string, url: string) => void;
  updateReviewClick: (item: VoteApp) => void;
}

const ActionButton = ({
  item,
  totalLikes = 0,
  totalComments = 0,
  totalOpens = 0,
  updateOpenAppClick,
  updateReviewClick,
}: IActionButton) => {
  const confettiInstance = useRef<CreateTypes | null>(null);
  const [totalCurrentLikes, setTotalCurrentLikes] = useState(totalLikes);
  const [totalCurrentOpen, setTotalCurrentOpen] = useState(totalOpens);
  const [likeCount, setLikeCount] = useState(0);

  const handleClick = () => {
    setLikeCount((prevCount) => prevCount + 1);
  };

  // Effect to handle debouncing
  useEffect(() => {
    if (likeCount > 0) {
      const timer = setTimeout(() => {
        postWithToken("/api/app/ranking/like", {
          chainId,
          proposalId: "",
          likeList: [
            {
              alias: item.alias,
              likeAmount: likeCount,
            },
          ],
        });
        setTotalCurrentLikes((prev) => prev + likeCount);
        setLikeCount(0);
      }, 2000);

      return () => clearTimeout(timer); // Cleanup timeout on unmount or update
    }
  }, [item.alias, likeCount]);

  const onInit = ({ confetti }: { confetti: CreateTypes }) => {
    confettiInstance.current = confetti;
  };

  const onLikeClick = () => {
    confettiInstance.current?.({
      angle: 110,
      particleCount: 15,
      spread: 70,
      origin: { y: 0.2, x: 0.88 },
      disableForReducedMotion: true,
      shapes: [HEART_SHAPE],
      zIndex: 10,
    });

    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");

    handleClick();
  };

  const onOpenAppClick = () => {
    updateOpenAppClick(item.alias, item.url);
    setTotalCurrentOpen((prev) => prev + 1);
  };

  return (
    <>
      <div className="flex flex-col absolute right-0 bottom-[45%] z-[10] right-[20px] gap-[27px]">
        <div
          role="button"
          className="flex flex-col items-center gap-1"
          onClick={onLikeClick}
        >
          <div className="flex w-[42px] h-[42px] rounded-full bg-white/25 justify-center items-center">
            <i className="votigram-icon-navbar-vote text-[32px] text-primary" />
          </div>
          <span
            className="text-[12px] leading-[13px]"
            data-testid="like-label-testid"
          >
            {totalCurrentLikes + likeCount}
          </span>
        </div>
        <div
          role="button"
          className="flex flex-col items-center gap-1"
          onClick={() => {
            updateReviewClick(item);
          }}
        >
          <div className="flex w-[42px] h-[42px] rounded-full bg-white/25 justify-center items-center">
            <i className="votigram-icon-chat-bubble text-[32px] text-primary" />
          </div>
          <span className="text-[12px] leading-[13px]">{totalComments}</span>
        </div>
        <div
          role="button"
          className="flex flex-col items-center gap-1"
          onClick={onOpenAppClick}
        >
          <div className="flex w-[42px] h-[42px] rounded-full bg-white/25 justify-center items-center">
            <i className="votigram-icon-arrow-ninety-degrees text-[26px] text-primary" />
          </div>
          <span className="text-[12px] leading-[13px]">{totalCurrentOpen}</span>
        </div>
      </div>
      <Confetti onInit={onInit} className="absolute w-full top-0" />
    </>
  );
};

export default ActionButton;
