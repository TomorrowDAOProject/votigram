import { useState } from "react";
import ToggleSlider from "../ToggleSlider";
import Accumulative from "./components/Accumulative";
import Current from "./components/Current";
import CategoryPillList from "../CategoryPillList";
import useDebounceFn from "ahooks/lib/useDebounceFn";

interface ITMAsProps {
  scrollTop: number;
}

const TMAs = ({ scrollTop }: ITMAsProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [keyward, setKeyward] = useState("");
  const [category, setCategory] = useState("");

  const { run: onKeywardChange } = useDebounceFn(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyward(e.target.value);
    },
    {
      wait: 700,
    }
  );

  const onCategoryChange = (category: string) => {
    setCategory(category || '');
  };

  return (
    <>
      <ToggleSlider
        current={currentTab}
        items={["Accumulative", "Current"]}
        className="pt-[4px] pb-[8px] rounded-none bg-transparent border-b-[2px] border-tertiary"
        activeItemClassName="top-auto bottom-0 h-[2px] rounded-none"
        itemClassName="font-bold text-[16px] leading-[16px] font-outfit"
        onChange={setCurrentTab}
      />

      <div className="mt-[14px] col-12 bg-input gap-2 h-[41px] px-4 flex items-center rounded-3xl">
        <i className="votigram-icon-search text-input-placeholder" />
        <input
          className="w-full bg-transparent placeholder:leading-[19.6px] text-[14px] text-white outline-none appearence-none z-10 placeholder:text-input-placeholder placeholder:font-questrial"
          placeholder="Search..."
          onChange={onKeywardChange}
        />
      </div>
      <CategoryPillList className="-mx-5" onChange={onCategoryChange} />

      {currentTab === 0 ? (
        <Accumulative
          scrollTop={scrollTop}
          keyward={keyward}
          category={category}
        />
      ) : (
        <Current scrollTop={scrollTop} keyward={keyward} category={category} />
      )}
    </>
  );
};

export default TMAs;
