import React from "react";
import { ListItem } from "..";

interface ItemProps {
  data: ListItem;
  className?: string;
  onClick?: (item: ListItem) => void;
}

const Item = ({ data, className, onClick }: ItemProps) => {
  return (
    <div
      className={`flex flex-row items-start gap-[19px] py-[9px] ${className}`}
      onClick={() => onClick?.(data)}
    >
      {data.avatar && (
        <div className="w-[29px] h-[29px] rounded-[47.5px] bg-tertiary shrink-0 overflow-hidden">
          <img
            src={data.avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <div className="flex flex-row items-end gap-[5px]">
          <span className="font-normal text-[11px] text-white font-questrial leading-[1.1]">
            {data.title}
          </span>
          {data.subtitle && (
            <span className="font-normal text-[11px] text-input-placeholder font-questrial leading-[1.1]">
              {data.subtitle}
            </span>
          )}
        </div>
        <div className="mt-[5px] font-normal text-[14px] text-white font-questrial leading-[1.2]">
          {data?.content}
        </div>
      </div>
    </div>
  );
};

export default Item;
