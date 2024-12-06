import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import ImageCarousel from "../ImageCarousel";
import AppDetail from "../AppDetail";
import Modal from "../Modal";
import ActionButton from "./ActionButton";
import CheckboxGroup from "../CheckboxGroup";
import { DISCOVER_CATEGORY } from "@/constants/discover";
import Drawer from "../Drawer";
import Textarea from "../Textarea";
import List, { ListItem } from "../List";
import { timeAgo } from "@/utils/time";

const initialVideoFiles = [
  {
    name: "Bine",
    icon: "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/cywjzr5cxzwk92k/avatar_1H6S8YgTL8.jpg",
    briefDesc: "Animals are done! It’s PAWS Season 🐾",
    description:
      "Earn rewards and NFTs in Bine Games! Complete tasks, open chests, and gear up for future airdrops! 🎮🚀💎",
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
      "Earn rewards and NFTs in Bine Games! Complete tasks, open chests, and gear up for future airdrops! 🎮🚀💎",
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
      "Earn rewards and NFTs in Bine Games! Complete tasks, open chests, and gear up for future airdrops! 🎮🚀💎",
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
        "Earn rewards and NFTs in Bine Games! Complete tasks, open chests, and gear up for future airdrops! 🎮🚀💎",
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
        "Earn rewards and NFTs in Bine Games! Complete tasks, open chests, and gear up for future airdrops! 🎮🚀💎",
      tag: ["Finance", "Ecommerce"],
      screenshot: [
        "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_1_2024_10_21_19_21_47_MJzMu5TedA.webp?thumb=576x0",
        "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_2_2024_10_21_19_21_47_ldhIgeWOXq.webp?thumb=576x0",
        "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/1blewwcgq6m1vt9/photo_3_2024_10_21_19_21_47_Pv2wQ3MgiW.webp?thumb=576x0",
      ],
    },
  ];
};

const DAILY_REWARDS = [2000, 2000, 2000, 2000, 2000, 2000, 5000];

const FileScroll = () => {
  const [videoFiles, setVideoFiles] = useState(initialVideoFiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const height = window.innerHeight;

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

  const fetchMoreReviews = (
    setItems: React.Dispatch<React.SetStateAction<ListItem[]>>,
    currentItems: ListItem[] = []
  ) => {
    setTimeout(() => {
      const nextItems = [...Array(10).keys()].map((n) => ({
        title: `User ${currentItems.length + n}`,
        subtitle: timeAgo(new Date("2022-01-01")),
        avatar:
          "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/cywjzr5cxzwk92k/avatar_1H6S8YgTL8.jpg",
        content:
          "This app is review! I love it so much! This app is review! I love it so much! This app is review! I love it so much!",
      }));
      setItems([...currentItems, ...nextItems]);

      if (currentItems.length + nextItems.length >= 50) {
        setHasMore(false);
      }
    }, 800);
  };

  return (
    <div className="h-screen overflow-hidden bg-discover-background">
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
      >
        {videoFiles.map((item, index) => (
          <div
            key={index}
            className="h-screen pt-[25px] flex flex-col relative items-center"
          >
            <ImageCarousel items={item.screenshot} />
            <AppDetail item={item} />
            <ActionButton />
          </div>
        ))}
      </motion.div>
      <Modal isVisible={false} rootClassName="p-5">
        <div className="col-12 items-center flex flex-col gap-[8px] mb-7">
          <span className="font-outfit text-[20px] leading-[20px] font-bold">
            Daily Rewards
          </span>
          <span className="text-[12px] leading-[13px]">
            Log in everyday to earn extra points!
          </span>
        </div>
        <div className="col-12 gap-[9px] flex flex-wrap justify-center mb-7">
          {DAILY_REWARDS.map((item, index) => (
            <div className="flex flex-col bg-tertiary w-[67px] rounded-[8px] gap-[15px] justify-center aspect-square items-center">
              <span className="text-[9px] leading-[10px]">Day {index + 1}</span>
              <span className="text-[14px] leading-[14px] text-secondary font-bold font-outfit">
                + {item.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <button className="bg-secondary text-black text-[14px] leading-[14px] font-outfit font-bold py-[10px] w-full rounded-[24px] mb-2">
          Watch Ads To Double The Point
        </button>
        <button className="bg-primary text-white text-[14px] leading-[14px] font-outfit font-bold py-[10px] w-full rounded-[24px]">
          Claim Today's Reward
        </button>
      </Modal>
      <Modal isVisible={false} rootClassName="px-[29px] pt-[45px] pb-[30px]">
        <span className="block text-[20px] font-bold leading-[20px] font-outfit">
          Select Your Areas of Interest
        </span>
        <span className="block mt-[8px] mb-[24px] text-[9px] leading-[10px] font-questrial">
          Your preferences will help us create a journey unique to you.
        </span>

        <CheckboxGroup options={DISCOVER_CATEGORY} onChange={console.log} />

        <button className="mt-[24px] bg-primary text-white text-[14px] leading-[14px] font-outfit font-bold py-[10px] w-full rounded-[24px] mt-[24px] mb-[16px]">
          Let’s Begin
        </button>
      </Modal>
      <Drawer isVisible={false} direction="bottom">
        <div className="relative w-full flex items-center justify-center py-[17px] px-[19px]">
          <span className="font-outfit text-[16px] leading-[1] font-bold text-white">
            Reviews
          </span>
          <i
            className="votigram-icon-cancel text-[14px] text-white absolute top-[15px] right-[18px] cursor-pointer"
            // onClick={() => setShowDrawer(false)}
          />
        </div>
        <div className="py-[4px]">
          <List
            hasMore={hasMore}
            height="60vh"
            loadData={fetchMoreReviews}
            emptyText="Write the first review!"
            rootClassname="px-[20px]"
          />
        </div>
        <div className="py-[17px] px-[20px] border-t-[1px] border-tertiary border-solid">
          <Textarea placeholder="Add a comment" />
        </div>
      </Drawer>
    </div>
  );
};

export default FileScroll;
