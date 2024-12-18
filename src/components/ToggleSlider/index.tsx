import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface IToggleSlider {
  items: string[];
  itemClassName?: string;
  activeItemClassName?: string;
  onChange?: (index: number) => void;
}

const ToggleSlider = ({ items = [], itemClassName, activeItemClassName, onChange }: IToggleSlider) => {
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
          className={clsx('absolute top-[3px] bg-primary px-[3px] rounded-full h-[22px]', activeItemClassName)}
          initial={false}
          animate={{
            x: itemRefs.current[activeIndex]?.offsetLeft || 0,
            width: itemRefs.current[activeIndex]?.offsetWidth || 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </AnimatePresence>
      <div className="relative flex w-full px-[4px] z-10">
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx('flex flex-1 items-center text-white justify-center px-4 cursor-pointer text-[13px] leading-[15px]', itemClassName, {
              'font-bold': activeIndex === index,
            })}
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
