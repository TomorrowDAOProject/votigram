import { APP_CATEGORY } from "@/constants/discover";

import "./index.css";
import clsx from "clsx";
import { useState } from "react";
import { DiscoverType } from "@/types/app";

interface ICategoryPillListProps {
  items: DiscoverType[];
  className?: string;
  onChange?: (category: APP_CATEGORY) => void;
}

const CategoryPillList = ({ items, className, onChange }: ICategoryPillListProps) => {
  const [active, setActive] = useState<APP_CATEGORY>(APP_CATEGORY.ALL);

  const handleClick = (category: APP_CATEGORY) => {
    setActive(active === category ? APP_CATEGORY.ALL : category);
    onChange?.(active === category ? APP_CATEGORY.ALL : category);
  };

  return (
    <div
      className={clsx(
        "app-category-list mb-[12px] col-12 overflow-scroll flex flex-nowrap z-10",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className={clsx(
            "flex p-2 item border-pill-border border-[1px] rounded-full",
            {
              "border-primary": active === item.value,
            }
          )}
          onClick={() => handleClick(item.value)}
        >
          <button className="w-max px-2 py-1 text-[13px] leading-[16px] text-white">
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryPillList;
