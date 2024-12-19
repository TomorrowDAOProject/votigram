import { useEffect, useRef, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import ImageCarousel from "../ImageCarousel";
import AppDetail from "./AppDetail";
import Modal from "../Modal";
import ActionButton from "./ActionButton";
import CheckboxGroup from "../CheckboxGroup";
import { DISCOVER_CATEGORY } from "@/constants/discover";
import Drawer from "../Drawer";
import TelegramHeader from "../TelegramHeader";
import { VoteApp } from "@/types/app";
import { postWithToken } from "@/hooks/useData";
import { chainId } from "@/constants/app";
import ReviewComment from "../ReviewComment";

interface IForYouType {
  currentForyouPage: number;
  items: VoteApp[];
  fetchForYouData: (alias: string[]) => void;
}

const ForYou = ({
  items,
  fetchForYouData,
  currentForyouPage = 1,
}: IForYouType) => {
  const currentPage = useRef<number>(currentForyouPage);
  const [forYouItems, setForYouItems] = useState<VoteApp[]>(items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowReviews, setIsShowReviews] = useState(false);
  const [currentActiveApp, setCurrentActiveApp] = useState<
    VoteApp | undefined
  >();
  const height = window.innerHeight;

  useEffect(() => {
    if (items && currentForyouPage > currentPage.current) {
      setForYouItems((prev) => [...prev, ...(items || [])]);
    }
  }, [items, currentForyouPage]);

  const handleDragEnd = async (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // Check velocity to determine the predominant direction
    const predominantDirection =
      Math.abs(info.velocity.y) > Math.abs(info.velocity.x);
    if (predominantDirection) {
      const direction = info.offset.y > 0 ? -1 : 1;
      let nextIndex = currentIndex + direction;

      // Ensure nextIndex is within bounds
      if (nextIndex < 0) {
        nextIndex = 0;
      } else if (nextIndex >= forYouItems.length) {
        nextIndex = forYouItems.length - 1;
      }

      setCurrentIndex(nextIndex);
      // Load more videos when reaching the second-to-last item
      if (nextIndex >= forYouItems.length - 5) {
        await fetchForYouData(forYouItems.slice(-10).map((item) => item.alias));
      }
    }
  };

  const updateOpenAppClick = (alias: string, url: string) => {
    postWithToken("/api/app/ranking/like", {
      chainId,
      alias,
    });
    window.open(url);
  };

  const updateReviewClick = (item: VoteApp) => {
    setIsShowReviews(true);
    setCurrentActiveApp(item);
  };

  const onDrawerClose = () => {
    setIsShowReviews(false);
  };

  return (
    <>
      <TelegramHeader title="For You" />
      <div className="h-screen overflow-hidden bg-discover-background pt-telegramHeader">
        <motion.div
          animate={{ y: -currentIndex * height }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="y"
          dragConstraints={{
            top: -((forYouItems.length - 1) * height),
            bottom: 0,
          }}
          dragDirectionLock
          onDragEnd={handleDragEnd}
          className="relative"
          whileDrag={{
            opacity: 0.5,
          }}
        >
          {forYouItems.map((item, index) => (
            <div
              key={index}
              className="h-screen pt-[25px] flex flex-col relative items-center"
            >
              <ImageCarousel items={item.screenshots} />
              <AppDetail item={item} updateOpenAppClick={updateOpenAppClick} />
              <ActionButton
                item={item}
                totalLikes={item.totalLikes || 0}
                totalComments={item.totalComments || 0}
                totalOpens={item.totalOpens || 0}
                updateOpenAppClick={updateOpenAppClick}
                updateReviewClick={updateReviewClick}
              />
            </div>
          ))}
        </motion.div>
        <Modal isVisible={false} rootClassName="px-[29px] pt-[45px] pb-[30px]">
          <span className="block text-[20px] font-bold leading-[20px] font-outfit text-white">
            Select Your Areas of Interest
          </span>
          <span className="block mt-[8px] mb-[24px] text-[9px] leading-[10px]">
            Your preferences will help us create a journey unique to you.
          </span>

          <CheckboxGroup options={DISCOVER_CATEGORY} onChange={console.log} />

          <button className="mt-[24px] bg-primary text-white text-[14px] leading-[14px] font-outfit font-bold py-[10px] w-full rounded-[24px] mt-[24px] mb-[16px]">
            Let's Begin
          </button>
        </Modal>
        <Drawer
          isVisible={isShowReviews}
          onClose={onDrawerClose}
          direction="bottom"
        >
          <ReviewComment
            onDrawerClose={onDrawerClose}
            currentActiveApp={currentActiveApp}
          />
        </Drawer>
      </div>
    </>
  );
};

export default ForYou;
