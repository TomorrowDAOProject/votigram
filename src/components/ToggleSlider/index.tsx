import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface IToggleSlider {
  items: string[];
  onChange?: (index: number) => void;
}

const ToggleSlider = ({ items = [], onChange }: IToggleSlider) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Initialize refs array with items count
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index)
  };

  return (
    <div className="relative h-full w-full max-w-full mx-auto bg-tertiary rounded-full flex items-center overflow-hidden">
      <AnimatePresence>
        <motion.div
          data-testid="selector-bg"
          className="absolute top-[3px] bg-primary px-[3px] rounded-full h-[22px]"
          initial={false}
          animate={{
            x: itemRefs.current[activeIndex]?.offsetLeft || 0,
            width: itemRefs.current[activeIndex]?.offsetWidth || 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </AnimatePresence>
      <div className="relative flex w-full z-10">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-1 items-center text-white justify-center px-4 cursor-pointer text-[13px] leading-[15px] ${
              activeIndex === index ? "font-bold" : ""
            }`}
            onClick={() => handleClick(index)}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleSlider;
