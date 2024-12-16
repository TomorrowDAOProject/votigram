import { ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

interface IDrawerProps {
  isVisible?: boolean;
  direction?: "left" | "right" | "top" | "bottom";
  children: ReactNode | ReactNode[];
  rootClassName?: string;
  onClose?: (v: boolean) => void;
}

const Drawer = ({
  isVisible,
  direction = "left",
  children,
  rootClassName,
  onClose,
}: IDrawerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisibleState, setIsVisibleState] = useState(isVisible);

  const variants = {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : "0",
      y: direction === "top" ? "-100%" : direction === "bottom" ? "100%" : "0",
      transition: { type: "tween", ease: "easeInOut", duration: 0.2 },
    },
    visible: {
      x: 0,
      y: 0,
      transition: { type: "tween", ease: "easeInOut", duration: 0.2 },
    },
  };

  const handleClose = () => {
    setIsVisibleState(false);
    onClose?.(false);
  };

  useEffect(() => {
    setIsVisibleState(isVisible);
  }, [isVisible])

  return (
    <>
      {isVisibleState && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 inset-0 bg-black opacity-50 z-[9998]"
          onClick={handleClose}
        />
      )}
      <AnimatePresence>
        {isVisibleState && (
          <motion.div
            ref={containerRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className={clsx(
              `fixed ${direction}-0 bg-black rounded-t-[35px] shadow-lg z-[9999]`,
              rootClassName,
              direction === "top" || direction === "bottom"
                ? "left-0"
                : "top-0",
              direction === "left" || direction === "right"
                ? "h-full"
                : "w-full"
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Drawer;
