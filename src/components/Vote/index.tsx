import React, { useState } from "react";
import ToggleSlider from "../ToggleSlider";
import { useUserContext } from "@/provider/UserProvider";
import SimpleTimePicker from "../SimpleTimePicker";
import SimpleDatePicker from "../SimpleDatePicker";
import Drawer from "../Drawer";
import VoteSection from "../VoteSection";
import VoteItem from "../VoteItem";
import { voteSectionData, VoteListItems } from "@/__mocks__/VoteApp";

const Vote = () => {
  const {
    user: { userPoints },
  } = useUserContext();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

      <div className="flex flex-row items-center gap-4">
        <button
          className="bg-tertiary text-white rounded-2 py-2 px-4"
          onClick={() => setShowDatePicker(true)}
        >
          Select Day
        </button>
        <span>Selected Day: {selectedDay}</span>
      </div>

      <div className="flex flex-row items-center gap-4 my-4">
        <button
          className="bg-tertiary text-white rounded-2 py-2 px-4"
          onClick={() => setShowTimePicker(true)}
        >
          Select Time
        </button>
        <span>Selected Time: {selectedTime}</span>
      </div>

      <div className="flex flex-row">
        <button
          className="bg-tertiary text-white rounded-2 py-2 px-4"
          onClick={() => setShowModal(true)}
        >
          Show Modal
        </button>
      </div>

      <SimpleTimePicker
        isVisible={showTimePicker}
        onChange={(value) => {
          setSelectedTime(value);
          setShowTimePicker(false);
        }}
      />
      <SimpleDatePicker
        isVisible={showDatePicker}
        onChange={(value) => {
          setSelectedDay(value);
          setShowDatePicker(false);
        }}
      />
      <Drawer
        isVisible={showModal}
        direction="bottom"
        rootClassName="pt-[34px] pb-[40px] bg-tertiary"
        onClose={() => setShowModal(false)}
      >
        <span className="block mb-[29px] text-[18px] font-outfit font-bold leading-[18px] text-center text-white">
          Creating Poll
        </span>
        <img
          className="mx-auto w-[236px] h-[208px] object-contain"
          src="https://cdn.tmrwdao.com/votigram/assets/imgs/AAF09912A14F.webp"
          alt="Tips"
        />
        <span className="block mt-[28px] text-center text-white whitespace-pre-wrap text-[14px] leading-[16.8px]">{`Your poll is currently being \nregistered on the blockchain.`}</span>
      </Drawer>
    </div>
  );
};

export default Vote;
