import ToggleSlider from "../ToggleSlider";
import { useUserContext } from "@/provider/UserProvider";
import VoteSection from "../VoteSection";
import VoteItem from "../VoteItem";
import { voteSectionData, VoteListItems } from "@/__mocks__/VoteApp";

const Vote = () => {
  const {
    user: { userPoints },
  } = useUserContext();

  return (
    <div className="h-screen overflow-scroll pt-telegramHeader">
      <div className="votigram-grid">
        <div className="col-7 h-7">
          <ToggleSlider items={["TMAs", "Community"]} />
        </div>
        <div className="flex flex-col col-5 items-end gap-[6px]">
          <span className="text-[10px] leading-[11px]">
            Total earned points:
          </span>
          <span className="font-pressStart text-secondary tracking-[-1.6] text-[16px] leading-[16px]">
            {userPoints?.userTotalPoints.toLocaleString() || 0}
          </span>
        </div>
      </div>

      <div className="p-4">
        {voteSectionData?.map((item) => (<VoteSection data={item} key={item.title} className="mb-3" />))}
      </div>

      <div className="px-4">
        {VoteListItems.map((vote, index) => <VoteItem data={vote} key={vote.id} showHat={index === 0} className={index !== 3 ? "bg-transparent" : ''} showBtn />)}
      </div>

    </div>
  );
};

export default Vote;
