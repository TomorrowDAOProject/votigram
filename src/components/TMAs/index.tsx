import { useState } from "react";
import Accumulative from "./components/Accumulative";
import Current from "./components/Current";
import CategoryPillList from "../CategoryPillList";
import useDebounceFn from "ahooks/lib/useDebounceFn";
import { COMMUNITY_TYPE } from "@/constants/vote";
import Tabs from "../Tabs";
import {
  APP_CATEGORY,
  DISCOVER_CATEGORY,
  DISCOVERY_CATEGORY_MAP,
} from "@/constants/discover";
import { VoteApp } from "@/types/app";
import useSetSearchParams from "@/hooks/useSetSearchParams";

const emaTabs = [
  {
    label: COMMUNITY_TYPE.ACCUMULATIVE,
    value: 0,
  },
  {
    label: COMMUNITY_TYPE.CURRENT,
    value: 1,
  },
];

interface ITMAsProps {
  scrollTop: number;
  onTabChange?: (index: number) => void;
  onAppItemClick?: (item: VoteApp) => void;
}

const TMAs = ({ scrollTop, onTabChange, onAppItemClick }: ITMAsProps) => {
  const { querys, updateQueryParam } = useSetSearchParams();
  const activeTab = querys.get("tmas");
  const [currentTab, setCurrentTab] = useState(
    activeTab === "1" ? Number(activeTab) : 0
  );
  const [keyward, setKeyward] = useState("");
  const [category, setCategory] = useState<APP_CATEGORY>(APP_CATEGORY.ALL);

  const { run: onKeywardChange } = useDebounceFn(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyward(e.target.value);
    },
    {
      wait: 700,
    }
  );

  const onCategoryChange = (category: APP_CATEGORY) => {
    setCategory(category);
  };

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    onTabChange?.(index);
    updateQueryParam({ key: "tmas", value: index.toString() })
  };

  return (
    <>
      <Tabs defaultValue={currentTab} options={emaTabs} onChange={handleTabChange} />

      <div className="mt-[14px] col-12 bg-input gap-2 h-[41px] px-4 flex items-center rounded-3xl">
        <i className="votigram-icon-search text-input-placeholder" />
        <input
          className="w-full bg-transparent placeholder:leading-[19.6px] text-[14px] text-white outline-none appearence-none z-10 placeholder:text-input-placeholder placeholder:font-questrial"
          placeholder="Search..."
          onChange={onKeywardChange}
        />
      </div>
      <CategoryPillList
        items={[
          {
            value: APP_CATEGORY.ALL,
            label: DISCOVERY_CATEGORY_MAP[APP_CATEGORY.ALL],
          },
          ...DISCOVER_CATEGORY.slice(1),
        ]}
        className="-mx-5"
        onChange={onCategoryChange}
      />

      {currentTab === 0 ? (
        <Accumulative
          scrollTop={scrollTop}
          keyward={keyward}
          category={category}
          onAppItemClick={onAppItemClick}
        />
      ) : (
        <Current
          scrollTop={scrollTop}
          keyward={keyward}
          category={category}
          onAppItemClick={onAppItemClick}
        />
      )}
    </>
  );
};

export default TMAs;
