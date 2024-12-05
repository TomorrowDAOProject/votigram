import AppItem from "../AppItem";
import "./index.css";

const DiscoveryHiddenGems = () => {
  return (
    <div className="flex font-outfit votigram-grid mb-[22px]">
      <div className="discovery-hidden-container">
        <span className="font-bold text-[16px] leading-[16px]">
          Discover Hidden Gems!
        </span>
        <AppItem />
      </div>
    </div>
  );
};

export default DiscoveryHiddenGems;
