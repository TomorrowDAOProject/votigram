import { VoteApp } from "@/types/app";
import AppItem from "../AppItem";

interface IAppList {
  title: string;
  items: VoteApp[];
}

const AppList = ({ title, items }: IAppList) => {
  return (
    <div className="flex flex-col votigram-grid items-start pb-28">
      <span className="font-outfit text-[20px] leading-[20px] font-bold mb-[18px]">
        {title}
      </span>
      <div className="flex gap-[22px] flex-col">
        {items?.map((item, index) => (
          <AppItem key={index} showArrow {...item} />
        ))}
      </div>
    </div>
  );
};

export default AppList;
