import { VoteApp } from "@/types/app";
import AppItem from "../AppItem";
import "./index.css";

interface IDiscoveryHiddenGemsProps {
  item: VoteApp;
}

const DiscoveryHiddenGems = ({ item }: IDiscoveryHiddenGemsProps) => {
  return (
    <div className="flex font-outfit votigram-grid mb-[22px] w-full">
      <div className="discovery-hidden-container">
        <span className="font-bold text-[20px] leading-[20px]">
          Discover Hidden Gems!
        </span>
        <AppItem {...item} />
      </div>
    </div>
  );
};

export default DiscoveryHiddenGems;
