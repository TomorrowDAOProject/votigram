import { useState } from "react";
import Archived from "./components/Archived";
import { COMMUNITY_LABEL, COMMUNITY_TYPE } from "@/constants/vote";
import Tabs from "../Tabs";
import useSetSearchParams from "@/hooks/useSetSearchParams";

const communityTabs = [
  {
    label: COMMUNITY_LABEL.ARCHIVED,
    value: 0,
  },
  {
    label: COMMUNITY_LABEL.CURRENT,
    value: 1,
  },
];
interface ICommunityProps {
  scrollTop: number;
}

const Community = ({ scrollTop }: ICommunityProps) => {
  const { querys, updateQueryParam } = useSetSearchParams();
  const activeTab = querys.get('community');
  const [currentTab, setCurrentTab] = useState(activeTab === '0' ? Number(activeTab) : 1);

  const onTabChange = (index: number) => {
    setCurrentTab(index);
    updateQueryParam("community", index.toString());
  };

  return (
    <>
      <Tabs defaultValue={1} options={communityTabs} onChange={onTabChange} />

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
