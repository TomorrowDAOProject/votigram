import { DISCOVER_CATEGORY } from "@/constants/discover";

import "./index.css";

const CategoryPillList = () => {
  return (
    <div className="app-category-list mb-[22px] col-12 overflow-scroll flex flex-nowrap">
      {DISCOVER_CATEGORY.map((item) => (
        <div
          key={item.label}
          className="flex p-2 item border-pill-border border-[1px] rounded-full"
        >
          <button className="w-max px-2 py-1 text-[13px] leading-[16px]">
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryPillList;
