import { VoteApp } from "@/types/app";
import AppItem from "../AppItem";
import "./index.css";

interface IDiscoveryHiddenGemsProps {
  item: VoteApp;
  onAppItemClick: (item: VoteApp) => void;
}

const DiscoveryHiddenGems = ({
  item,
  onAppItemClick,
}: IDiscoveryHiddenGemsProps) => {
  return (
    <div className="flex font-outfit votigram-grid mb-[22px] w-full">
      <div className="discovery-hidden-container">
        <span className="font-bold text-[20px] leading-[20px] text-white">
          Discover Hidden Gems!
        </span>
        <AppItem onAppItemClick={onAppItemClick} item={item} />
      </div>
    </div>
  );
};

export default DiscoveryHiddenGems;
