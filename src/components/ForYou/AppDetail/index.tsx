/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { height: "max-content" },
  visible: {
    height: "auto",
    background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 40%)",
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "max-content", marginBottom: 14 },
};

interface IAppDetailProps {
  item: any; //TODO
}

const AppDetail = ({ item }: IAppDetailProps) => {
  const [isExpand, setIsExpand] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      {isExpand && (
        <div className="flex h-screen w-full opacity-0 absolute top-0 left-0 z-[10000]" />
      )}
      <motion.div
        ref={containerRef}
        initial="visible"
        animate={isExpand ? "visible" : "hidden"}
        variants={containerVariants}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
        }}
        className="w-full flex flex-col absolute bottom-telegramHeader h-max z-[100] pl-5 pr-[20px]"
        onClick={() => {
          setIsExpand(!isExpand);
        }}
      >
        <div className="flex gap-2 mb-[14px]">
          <img
            src={item.icon}
            className="h-[48px] aspect-square rounded-[8px] border-app-icon-border border-[1px]"
            alt=""
          />
          <div className="flex flex-col gap-[5px] justify-center">
            <span className="font-outfit font-bold text-[16px] leading-[16px]">
              {item.name}
            </span>
            <span className="text-[11px] leading-[13px]">{item.briefDesc}</span>
          </div>
        </div>
        <motion.div
          initial="hidden"
          animate={isExpand ? "visible" : "hidden"}
          variants={descriptionVariants}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
          }}
          className="flex w-full text-[13px] leading-[15px]"
        >
          {item.description}
        </motion.div>

        <div className="flex pb-[90px]">
          <div className="flex flex-1 gap-[6px] items-center">
            <div className="flex item h-[22px] border-pill-border border-[1px] rounded-full">
              <button className="w-max h-[22px] px-2 text-[12px] leading-[13px]">
                💰 New
              </button>
            </div>
            <div className="flex item h-[22px] border-pill-border border-[1px] rounded-full">
              <button className="w-max h-[22px] px-2 text-[12px] leading-[13px]">
                🎮 Game
              </button>
            </div>
          </div>
          <div className="flex flex-1 justify-end items-center">
            <button className="flex justify-center items-center w-[98px] bg-primary font-outfit font-bold text-[14px] leading-[14px] py-[10px] rounded-[24px]">
              Open
              <i className="votigram-icon-arrow-ninety-degrees text-[14px] ml-[5px]" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AppDetail;
