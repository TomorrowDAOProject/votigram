import React from "react";
import ToggleSlider from "../ToggleSlider";
import { useUserContext } from "@/provider/UserProvider";

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
    </div>
  );
};

export default Vote;
