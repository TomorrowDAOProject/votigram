import Loading from "@/components/Loading";
import VoteItem from "@/components/VoteItem";
import { VoteItemType } from "@/components/VoteItem/type";
import { chainId } from "@/constants/app";
import useData from "@/hooks/useData";
import { useEffect, useState } from "react";

interface IAccumulativeProps {
  scrollTop: number;
  keyward: string;
  category: string;
}
const PAGE_SIZE = 20;

const Current = ({ scrollTop, keyward, category: cate }: IAccumulativeProps) => {
  const [hasMore, setHasMore] = useState(true);
  const [voteList, setVoteList] = useState<VoteItemType[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [proposalId, setProposalId] = useState("");
  const [canVote, setCanVote] = useState(false);

  const { data, isLoading } = useData(
    `/api/app/discover/current-app-list?${new URLSearchParams({
      chainId,
      category,
      skipCount: (pageIndex * PAGE_SIZE).toString(),
      maxResultCount: PAGE_SIZE.toString(),
      search,
    }).toString()}`
  );

  useEffect(() => {
    const { data: voteList } = data || {};
    if (voteList && Array.isArray(voteList)) {
      setVoteList((prev) =>
        pageIndex === 0 ? voteList : [...prev, ...voteList]
      );
      setCanVote(data.canVote);
      setProposalId(data.proposalId);
      setHasMore(voteList?.length >= PAGE_SIZE);
    }
  }, [data, pageIndex]);

  useEffect(() => {
    if (scrollTop && scrollTop < 50 && hasMore && !isLoading) {
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    }
  }, [hasMore, isLoading, scrollTop]);

  useEffect(() => {
    setSearch(keyward || '');
    setPageIndex(0);
  }, [keyward]);

  useEffect(() => {
    setCategory(cate);
    setPageIndex(0);
  }, [cate]);

  return (
    <div className="pt-3 pb-[100px]">
      {voteList?.map((vote, index) => (
        <VoteItem
          key={`${vote.alias}_${index}`}
          data={vote}
          rank={index + 1}
          proposalId={proposalId}
          showHat={index === 0}
          className="bg-transparent"
          canVote={canVote}
          category={category}
          onVoted={() => setCanVote(false)}
          showBtn
        />
      ))}
      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Current;
