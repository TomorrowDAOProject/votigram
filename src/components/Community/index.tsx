import { useState } from "react";
import Archived from "./components/Archived";
import { COMMUNITY_LABEL, COMMUNITY_TYPE } from "@/constants/vote";
import Tabs from "../Tabs";

const communityTabs = [{
  label: COMMUNITY_LABEL.ARCHIVED,
  value: 0,
}, {
  label: COMMUNITY_LABEL.CURRENT,
  value: 1,
}]
interface ICommunityProps {
  scrollTop: number;
}

const Community = ({ scrollTop }: ICommunityProps) => {
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <>
      <Tabs defaultValue={1} options={communityTabs} onChange={setCurrentTab} />

      <Archived
        scrollTop={scrollTop}
        type={
          currentTab === 0
            ? COMMUNITY_TYPE.ACCUMULATIVE
            : COMMUNITY_TYPE.CURRENT
        }
      />
    </>
  );
};

export default Community;
