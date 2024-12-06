import React, { useState, useEffect, useRef } from "react";
import Item from "./components/Item";
import clsx from "clsx";
import { ListItem } from "./type";

interface IListProps {
  height?: number | string;
  loadData?: (
    setItems: React.Dispatch<React.SetStateAction<ListItem[]>>,
    currentItems?: ListItem[]
  ) => void;
  hasMore: boolean;
  emptyText?: string;
  noMoreText?: string;
  threshold?: number;
  rootClassname?: string;
  itemClassname?: string;
}

const List: React.FC<IListProps> = ({
  height = 300,
  threshold = 50,
  loadData,
  hasMore,
  emptyText,
  noMoreText,
  rootClassname,
  itemClassname,
}) => {
  const [items, setItems] = useState<ListItem[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadData?.(setItems);
  }, [loadData]);

  const handleScroll = () => {
    const list = listRef.current;
    if (
      list &&
      list.scrollHeight - list.scrollTop - list.clientHeight < threshold &&
      hasMore
    ) {
      loadData?.(setItems, items);
    }
  };

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (list) {
        list.removeEventListener("scroll", handleScroll);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, hasMore]);

  const calculatedHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      ref={listRef}
      role="list"
      className="overflow-x-hidden overflow-y-auto"
      style={{ height: calculatedHeight }}
    >
      {items.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <span className="font-normal text-[13px] text-white font-questrial leading-[1.2]">
            {emptyText || "No data"}
          </span>
        </div>
      )}
      <div className={clsx('min-h-full', rootClassname)}>
        {items.map((item, index) => (
          <Item
            data={item}
            key={`${item.id}-${index}`}
            className={itemClassname}
          />
        ))}
        {items.length > 0 && !hasMore && (
          <div className="py-[20px] flex items-center justify-center">
            <span className="font-normal text-[13px] text-white font-questrial leading-[1.2]">
              {noMoreText || "No more data"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
