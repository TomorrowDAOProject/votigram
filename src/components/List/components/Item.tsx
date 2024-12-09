import React from "react";
import { ListItem } from "../type";
import { timeAgo } from "@/utils/time";

interface ItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  className?: string;
  onClick?: (item: ListItem) => void;
}

const Item = ({ data, className, onClick }: ItemProps) => {
  return (
    <div
      className={`flex flex-row items-start gap-[19px] py-[9px] ${className}`}
      onClick={() => onClick?.(data)}
    >
      {data.commenterPhoto && (
        <div className="w-[29px] h-[29px] rounded-[47.5px] bg-tertiary shrink-0 overflow-hidden">
          <img
            src={data.commenterPhoto}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <div className="flex flex-row items-end gap-[5px]">
          <span className="font-normal text-[11px] text-white leading-[13.2px]">
            {data.commenterName}
          </span>
          {data.createTime && (
            <span className="font-normal text-[11px] text-input-placeholder leading-[13.2px]">
              {timeAgo(data.createTime)}
            </span>
          )}
        </div>
        <div className="mt-[5px] font-normal text-[14px] text-white leading-[16.8px]">
          {data?.comment}
        </div>
      </div>
    </div>
  );
};

export default Item;
