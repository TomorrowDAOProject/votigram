import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import ImageCarousel from "../ImageCarousel";
import AppDetail from "./AppDetail";
import Modal from "../Modal";
import ActionButton from "./ActionButton";
import CheckboxGroup from "../CheckboxGroup";
import { DISCOVER_CATEGORY } from "@/constants/discover";
import Drawer from "../Drawer";
import Textarea from "../Textarea";
import ReviewList from "../ReviewList";
import qs from "qs";
// import { timeAgo } from "@/utils/time";
import TelegramHeader from "../TelegramHeader";
import { postWithToken, useInfinite } from "@/hooks/useData";
import useThrottleFn from "ahooks/lib/useThrottleFn";
import { CommentItem } from "@/types/app";
import useDebounceFn from "ahooks/lib/useDebounceFn";

const initialVideoFiles = [
  {
    name: "Bine",
    icon: "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/cywjzr5cxzwk92k/avatar_1H6S8YgTL8.jpg",
    briefDesc: "Animals are done! It’s PAWS Season 🐾",
    description:
      "COLLECT $SYNQUEST points and secure a $SYNAI airdrop, INVITE your friends to score even more points. Play now and let your legend unfold!",
    tag: ["Finance", "Ecommerce"],
    screenshot: [
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_1_2024_10_21_19_21_47_MJzMu5TedA.webp?thumb=576x0",
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_2_2024_10_21_19_21_47_ldhIgeWOXq.webp?thumb=576x0",
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_3_2024_10_21_19_21_47_Pv2wQ3MgiW.webp?thumb=576x0",
    ],
  },
  {
    name: "Bine",
    icon: "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/cywjzr5cxzwk92k/avatar_1H6S8YgTL8.jpg",
    briefDesc: "Animals are done! It’s PAWS Season 🐾",
    description:
      "COLLECT $SYNQUEST points and secure a $SYNAI airdrop, INVITE your friends to score even more points. Play now and let your legend unfold!",
    tag: ["Finance", "Ecommerce"],
    screenshot: [
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_1_2024_10_21_19_21_47_MJzMu5TedA.webp?thumb=576x0",
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_2_2024_10_21_19_21_47_ldhIgeWOXq.webp?thumb=576x0",
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_3_2024_10_21_19_21_47_Pv2wQ3MgiW.webp?thumb=576x0",
    ],
  },
  {
    name: "Bine",
    icon: "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/cywjzr5cxzwk92k/avatar_1H6S8YgTL8.jpg",
    briefDesc: "Animals are done! It’s PAWS Season 🐾",
    description:
      "COLLECT $SYNQUEST points and secure a $SYNAI airdrop, INVITE your friends to score even more points. Play now and let your legend unfold!",
    tag: ["Finance", "Ecommerce"],
    screenshot: [
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_1_2024_10_21_19_21_47_MJzMu5TedA.webp?thumb=576x0",
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_2_2024_10_21_19_21_47_ldhIgeWOXq.webp?thumb=576x0",
      "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_3_2024_10_21_19_21_47_Pv2wQ3MgiW.webp?thumb=576x0",
    ],
  },
];

const fetchMoreVideos = () => {
  // Simulate fetching more videos - in a real app, you'd request data from an API
  return [
    {
      name: "Bine4",
      icon: "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/cywjzr5cxzwk92k/avatar_1H6S8YgTL8.jpg",
      briefDesc: "Animals are done! It’s PAWS Season 🐾",
      description:
        "COLLECT $SYNQUEST points and secure a $SYNAI airdrop, INVITE your friends to score even more points. Play now and let your legend unfold!",
      tag: ["Finance", "Ecommerce"],
      screenshot: [
        "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_1_2024_10_21_19_21_47_MJzMu5TedA.webp?thumb=576x0",
        "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_2_2024_10_21_19_21_47_ldhIgeWOXq.webp?thumb=576x0",
        "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_3_2024_10_21_19_21_47_Pv2wQ3MgiW.webp?thumb=576x0",
      ],
    },
    {
      name: "Bine5",
      icon: "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/cywjzr5cxzwk92k/avatar_1H6S8YgTL8.jpg",
      briefDesc: "Animals are done! It’s PAWS Season 🐾",
      description:
        "COLLECT $SYNQUEST points and secure a $SYNAI airdrop, INVITE your friends to score even more points. Play now and let your legend unfold!",
      tag: ["Finance", "Ecommerce"],
      screenshot: [
        "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_1_2024_10_21_19_21_47_MJzMu5TedA.webp?thumb=576x0",
        "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_2_2024_10_21_19_21_47_ldhIgeWOXq.webp?thumb=576x0",
        "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_3_2024_10_21_19_21_47_Pv2wQ3MgiW.webp?thumb=576x0",
      ],
    },
  ];
};

const PAGE_SIZE = 10;

const ForYou = () => {
  const [videoFiles, setVideoFiles] = useState(initialVideoFiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShowReviews, setIsShowReviews] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likeAmount, setLikeAmount] = useState(0);
  const height = window.innerHeight;

  const { data, isLoading, size, setSize } = useInfinite(
    (index) =>
      isShowReviews
        ? `/api/app/discussion/comment-list?${qs.stringify({
            chainId: "tDVW",
            skipCount: index * PAGE_SIZE,
            alias: "string",
            parentId: "string",
            comment: "string",
            maxResultCount: PAGE_SIZE,
            skipId: "string",
          })}`
        : null,
    0
  );

  console.log(data)

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const hasMoreData =
    size === 0 || (data && data[data.length - 1]?.length === PAGE_SIZE);
  let allItems: CommentItem[] = data ? [].concat(...data) : [];

  const handleDragEnd = (
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
      } else if (nextIndex >= videoFiles.length) {
        nextIndex = videoFiles.length - 1;
      }

      setCurrentIndex(nextIndex);
      // Load more videos when reaching the second-to-last item
      if (nextIndex >= videoFiles.length - 2 && videoFiles.length < 10) {
        const moreVideos = fetchMoreVideos();
        setVideoFiles((prev) => [...prev, ...moreVideos]);
      }
    }
  };

  const { run: handleSubmit } = useThrottleFn(
    async (comment) => {
      try {
        setLoading(true);
        const { data } = await postWithToken(
          "/api/app/discussion/new-comment",
          {
            chainId: "tDVW",
            alias: "string",
            parentId: "string",
            comment,
          },
          'application/x-www-form-urlencoded'
        );
        if (data.success) {
          allItems = [data?.comment, ...allItems];
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    { wait: 500 }
  );

  const { run: submitLike } = useDebounceFn(
    async (alias) => {
      try {
        setLoading(true);
        await postWithToken("/api/app/ranking/like", {
          chainId: "tDVW",
          proposalId: "string",
          likeList: [
            {
              alias,
              likeAmount,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    {
      wait: 1000,
    }
  );

  const handleLike = (alias: string) => {
    setLikeAmount((prev) => prev + 1);
    submitLike(alias);
  };

  const onReviewsClick = () => {
    setIsShowReviews(true);
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
            top: -((videoFiles.length - 1) * height),
            bottom: 0,
          }}
          dragDirectionLock
          onDragEnd={handleDragEnd}
          className="relative"
          whileDrag={{
            opacity: 0.5,
          }}
        >
          {videoFiles.map((item, index) => (
            <div
              key={index}
              className="h-screen pt-[25px] flex flex-col relative items-center"
            >
              <ImageCarousel items={item.screenshot} />
              <AppDetail item={item} />
              <ActionButton
                onLikeClick={() => handleLike(item.name)}
                onReviewsClick={onReviewsClick}
              />
            </div>
          ))}
        </motion.div>

        <Modal isVisible={false} rootClassName="px-[29px] pt-[45px] pb-[30px]">
          <span className="block text-[20px] font-bold leading-[20px] font-outfit">
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
        <Drawer isVisible={isShowReviews} direction="bottom">
          <div className="relative w-full flex items-center justify-center py-[17px] px-[19px]">
            <span className="font-outfit text-[16px] leading-[1] font-bold text-white">
              Reviews
            </span>
            <i
              className="votigram-icon-cancel text-[14px] text-white absolute top-[15px] right-[18px] cursor-pointer"
              onClick={() => setIsShowReviews(false)}
            />
          </div>
          <div className="py-1">
            <ReviewList
              hasMore={hasMoreData}
              height="60vh"
              dataSource={allItems}
              loadData={() => setSize(size + 1)}
              emptyText="Write the first review!"
              rootClassname="px-5"
              renderLoading={() =>
                isLoadingMore && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-[30px] h-[30px] animate-spin rounded-full bg-white"></div>
                  </div>
                )
              }
            />
          </div>
          <div className="py-[17px] px-5 border-t-[1px] border-tertiary border-solid">
            <Textarea
              disabled={loading}
              placeholder="Add a comment"
              onSubmit={handleSubmit}
            />
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default ForYou;
