import ToggleSlider from "../ToggleSlider";
import { useUserContext } from "@/provider/UserProvider";
import TMAs from "../TMAs";
import { useCallback, useEffect, useRef, useState } from "react";
import Community from "../Community";

const Vote = () => {
  const {
    user: { userPoints },
  } = useUserContext();
  const [currnetTab, setCurrentTab] = useState("TMAs");
  const scrollViewRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollRef = scrollViewRef.current;
    if (scrollRef) {
      setScrollTop(
        scrollRef.scrollHeight - scrollRef.scrollTop - scrollRef.clientHeight
      );
    }
  }, [scrollViewRef]);

  useEffect(() => {
    const scrollRef = scrollViewRef.current;
    if (scrollRef) {
      scrollRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef) {
        scrollRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, scrollViewRef]);

  return (
    <div
      className="h-screen overflow-scroll pt-telegramHeader bg-black"
      ref={scrollViewRef}
    >
      <div className="votigram-grid">
        <div className="col-7 h-7">
          <ToggleSlider
            items={["TMAs", "Community"]}
            onChange={(index) =>
              setCurrentTab(index === 0 ? "TMAs" : "Community")
            }
          />
        </div>
        <div className="flex flex-col col-5 items-end gap-[6px]">
          <span className="text-[10px] leading-[11px] text-white">
            Total earned points:
          </span>
          <span className="font-pressStart text-secondary tracking-[-1.6] text-[16px] leading-[16px]">
            {userPoints?.userTotalPoints.toLocaleString() || 0}
          </span>
        </div>
        <div className="mt-8 col-12">
          {currnetTab === "TMAs" ? (
            <TMAs scrollTop={scrollTop} />
          ) : (
            <Community scrollTop={scrollTop} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Vote;
