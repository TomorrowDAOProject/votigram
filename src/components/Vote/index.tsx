import React from "react";
import ToggleSlider from "../ToggleSlider";
import { useUserContext } from "@/provider/UserProvider";
import SimpleTimePicker from "../SimpleTimePicker";
import SimpleDatePicker from "../SimpleDatePicker";
import Drawer from "../Drawer";

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
      <SimpleTimePicker isVisible={false} onChange={console.log} />
      <SimpleDatePicker isVisible={true} onChange={console.log} />
      <Drawer
        isVisible={false}
        direction="bottom"
        rootClassName="pt-[34px] pb-[40px] bg-tertiary"
      >
        <span className="block mb-[29px] text-[18px] font-outfit font-bold leading-[18px] text-center text-white">
          Creating Poll
        </span>
        <img
          className="mx-auto w-[236px] h-[208px] object-contain"
          src=""
          alt="Tips"
        />
        <span className="block mt-[28px] text-center text-white whitespace-pre-wrap text-[14px] leading-[16.8px]">{`Your poll is currently being \nregistered on the blockchain.`}</span>
      </Drawer>
    </div>
  );
};

export default Vote;
