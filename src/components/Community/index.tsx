import { useState } from "react";
import ToggleSlider from "../ToggleSlider";
import Archived from "./components/Archived";
import { COMMUNITY_LABEL, COMMUNITY_TYPE } from "@/constants/vote";

interface ICommunityProps {
  scrollTop: number;
}

const Community = ({ scrollTop }: ICommunityProps) => {
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <div>
      <ToggleSlider
        current={currentTab}
        items={[COMMUNITY_LABEL.ARCHIVED, COMMUNITY_LABEL.CURRENT]}
        className="pt-[4px] pb-[8px] rounded-none bg-transparent border-b-[2px] border-tertiary"
        activeItemClassName="top-auto bottom-0 h-[2px] rounded-none"
        itemClassName="font-bold text-[16px] leading-[16px] font-outfit"
        onChange={setCurrentTab}
      />

      <Archived
        scrollTop={scrollTop}
        type={
          currentTab === 0
            ? COMMUNITY_TYPE.ACCUMULATIVE
            : COMMUNITY_TYPE.CURRENT
        }
      />
    </div>
  );
};

export default Community;
