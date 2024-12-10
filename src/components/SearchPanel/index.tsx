import { VoteApp } from "@/types/app";
import React from "react";
import AppItem from "../AppItem";
import { useAdsgram } from "@/hooks/useAdsgram";

interface ISearchPanel {
  recommendList: VoteApp[];
  onAppItemClick: (item: VoteApp) => void;
}

const SearchPanel = ({ recommendList, onAppItemClick }: ISearchPanel) => {
  const showAd = useAdsgram({
    blockId: import.meta.env.VITE_ADSGRAM_ID || "",
    onReward: () => {},
    onError: () => {},
    onSkip: () => {},
  });

  return (
    <div className="votigram-grid gap-[22px] mb-[120px]">
      <img
        onClick={showAd}
        className="col-12 rounded-[18px]"
        src="https://cdn.tmrwdao.com/votigram/assets/imgs/30E58CBD0603.webp"
      />
      <div className="flex flex-col col-12 gap-[22px]">
        {recommendList?.map((item) => (
          <AppItem showArrow item={item} onAppItemClick={onAppItemClick} />
        ))}
      </div>
    </div>
  );
};

export default SearchPanel;
