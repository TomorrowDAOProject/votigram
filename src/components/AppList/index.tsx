import { VoteApp } from "@/types/app";
import AppItem from "../AppItem";

interface IAppList {
  title: string;
  items: VoteApp[];
}

const AppList = ({ title, items }: IAppList) => {
  return (
    <div className="flex flex-col votigram-grid items-start pb-24">
      <span className="font-outfit text-[20px] leading-[20px] font-bold mb-[18px]">
        {title}
      </span>
      <div className="flex gap-[20px] flex-col">
        {items.map((_, index) => (
          <AppItem key={index} showArrow />
        ))}
      </div>
    </div>
  );
};

export default AppList;
