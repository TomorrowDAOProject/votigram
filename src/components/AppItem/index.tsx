import { VoteApp } from "@/types/app";

interface IAppItem extends VoteApp {
  showArrow?: boolean;
}

const AppItem = ({ showArrow = false, title, description, icon }: IAppItem) => {
  return (
    <div className="flex gap-[18px] items-center">
      <img
        className="w-[48px] aspect-square rounded-[8px]"
        src={icon}
        alt={title}
        data-testid="app-item-icon"
      />
      <div className="flex flex-col gap-[5px] flex-1">
        <span className="font-bold text-[16px] leading-[16px] font-outfit">
          {title}
        </span>
        <span className="font-normal text-[12px] leading-[13px]">
          {description}
        </span>
      </div>
      {showArrow && (
        <i
          data-testid="arrow-icon"
          className="votigram-icon-arrow-go text-secondary"
        />
      )}
    </div>
  );
};

export default AppItem;
