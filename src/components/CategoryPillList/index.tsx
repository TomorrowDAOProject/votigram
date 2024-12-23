import { APP_CATEGORY, DISCOVER_CATEGORY } from "@/constants/discover";

import "./index.css";
import clsx from "clsx";
import { useState } from "react";

interface ICategoryPillListProps {
  className?: string;
  onChange?: (category: APP_CATEGORY) => void;
}

const CategoryPillList = ({ className, onChange }: ICategoryPillListProps) => {
  const [active, setActive] = useState<APP_CATEGORY | null>(null);

  const handleClick = (category: APP_CATEGORY) => {
    setActive(category);
    onChange?.(category);
  };

  return (
    <div
      className={clsx(
        "app-category-list mb-[12px] col-12 overflow-scroll flex flex-nowrap z-10",
        className
      )}
    >
      {DISCOVER_CATEGORY.map((item) => (
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
