import React, { useCallback, useEffect, useRef } from "react";
import Item from "./components/Item";
import clsx from "clsx";

interface IListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataSource: any[];
  height?: number | string;
  loadData?: () => void;
  hasMore?: boolean;
  emptyText?: string;
  noMoreText?: string;
  threshold?: number;
  rootClassname?: string;
  itemClassname?: string;
  renderLoading?: () => React.ReactNode;
}

const List: React.FC<IListProps> = ({
  dataSource: items,
  height = 300,
  threshold = 50,
  loadData,
  hasMore,
  emptyText,
  noMoreText,
  rootClassname,
  itemClassname,
  renderLoading,
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hasMore) {
      loadData?.();
    }
  }, [hasMore, loadData]);

  const handleScroll = useCallback(() => {
    const list = listRef.current;
    if (
      list &&
      list.scrollHeight - list.scrollTop - list.clientHeight < threshold &&
      hasMore
    ) {
      loadData?.();
    }
  }, [hasMore, loadData, threshold]);

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
  }, [handleScroll]);

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
            key={`${item?.id}-${index}`}
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
        {renderLoading?.()}
      </div>
    </div>
  );
};

export default List;
