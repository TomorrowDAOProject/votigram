import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface IToggleSlider {
  current?: number;
  items: string[];
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  onChange?: (index: number) => void;
}

const ToggleSlider = ({
  current,
  items = [],
  className,
  itemClassName,
  activeItemClassName,
  onChange,
}: IToggleSlider) => {
  const [activeIndex, setActiveIndex] = useState<number>(current || 0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Initialize refs array with items count
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  // Ensure layout is ready before running animations
  useEffect(() => {
    // Wait until the next frame to allow the DOM to fully render
    const timeout = setTimeout(() => {
      setReady(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, [items.length]);

  return (
    <div
      className={clsx(
        "relative h-full w-full max-w-full mx-auto bg-tertiary rounded-full flex items-center overflow-hidden",
        className
      )}
    >
      <AnimatePresence>
        {ready && (
          <motion.div
            data-testid="selector-bg"
            className={clsx(
              "absolute top-[3px] bg-primary px-[3px] rounded-full h-[22px]",
              activeItemClassName
            )}
            initial={false}
            animate={{
              x: itemRefs.current[activeIndex]?.offsetLeft || 4,
              width: itemRefs.current[activeIndex]?.offsetWidth || "50%",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
      <div className="relative flex w-full px-[4px] z-10">
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "flex flex-1 items-center text-white justify-center px-4 cursor-pointer text-[13px] leading-[15px]",
              itemClassName,
              {
                "font-bold": activeIndex === index,
              }
            )}
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
