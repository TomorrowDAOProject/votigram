import React, { useEffect, useState } from "react";
import ReviewList from "../ReviewList";
import useData, { postWithToken } from "@/hooks/useData";
import { chainId } from "@/constants/app";
import Textarea from "../Textarea";
import clsx from "clsx";
import { VoteApp } from "@/types/app";
import { Comment } from "@/types/comment";

interface IReviewDrawerProps {
  onDrawerClose: () => void;
  currentActiveApp: VoteApp | undefined;
}

const PAGE_SIZE = 20;

const ReviewComment = ({
  onDrawerClose,
  currentActiveApp,
}: IReviewDrawerProps) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  const { data, isLoading } = useData(
    `/api/app/discussion/comment-list?${new URLSearchParams({
      chainId,
      skipCount: (pageIndex * PAGE_SIZE).toString(),
      maxResultCount: PAGE_SIZE.toString(),
      alias: currentActiveApp?.alias || "",
    }).toString()}`
  );

  useEffect(() => {
    if (data) {
      setCommentList((prev) => [...prev, ...data.items]);
    }

    return () => {
      setCommentList([]);
    };
  }, [data]);

  const onCommentSubmit = async () => {
    const { data } = await postWithToken("/api/app/discussion/new-comment", {
      chainId,
      alias: currentActiveApp?.alias,
      comment,
    });

    if (data?.success) {
      setCommentList((prev) => [data?.comment, ...prev]);
      setComment("");
    }
  };

  const onCommentChange = (value: string) => {
    setComment(value);
  };

  return (
    <>
      <div className="relative w-full flex items-center justify-center py-[17px] px-[19px]">
        <span className="font-outfit text-[16px] leading-[1] font-bold text-white">
          Reviews
        </span>
        <i
          className="votigram-icon-cancel text-[14px] text-white absolute top-[15px] right-[18px] cursor-pointer"
          onClick={onDrawerClose}
        />
      </div>
      <div className="py-1">
        <ReviewList
          hasMore={data?.hasMore || false}
          height="60vh"
          dataSource={commentList}
          loadData={() => setPageIndex((pageIndex) => pageIndex + 1)}
          emptyText="Write the first review!"
          rootClassname="px-5"
          renderLoading={() =>
            isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="w-[30px] h-[30px] animate-spin rounded-full bg-white"></div>
              </div>
            )
          }
        />
      </div>
      <div className="flex flex-row gap-2 py-[17px] px-5 border-t-[1px] border-tertiary items-end border-solid">
        <Textarea
          value={comment}
          onChange={onCommentChange}
          placeholder="Add a comment"
        />
        <button
          type="button"
          className="bg-tertiary w-[40px] h-[40px] flex justify-center items-center p-[8px] rounded-[20px] shrink-0"
          disabled={comment.trim().length === 0}
          onClick={onCommentSubmit}
        >
          <i
            className={clsx(
              "votigram-icon-send text-[24px]",
              comment.length > 0 ? "text-primary" : "text-input-placeholder"
            )}
          />
        </button>
      </div>
    </>
  );
};

export default ReviewComment;
