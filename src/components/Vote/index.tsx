import React, { useState } from "react";
import ToggleSlider from "../ToggleSlider";
import { useUserContext } from "@/provider/UserProvider";
import SimpleTimePicker from "../SimpleTimePicker";
import SimpleDatePicker from "../SimpleDatePicker";
import Drawer from "../Drawer";
import VoteItem from "../VoteItem";

const Votes = [
  {
    id: 1,
    rank: 1,
    title: "Sample Title 1",
    amount: 123,
    avatar: "https://i.pravatar.cc/150?img=1", // Random avatar URL
    hatIcon: "https://img.icons8.com/color/48/000000/party-hat.png",
    voted: true,
    progress: 45,
  },
  {
    id: 2,
    title: "Sample Title 2",
    amount: 456,
    avatar: "https://i.pravatar.cc/150?img=2", // Random avatar URL
    hatIcon: "https://img.icons8.com/color/48/000000/wizard-hat.png",
    voted: false,
    progress: 67,
  },
  {
    id: 3,
    title: "Sample Title 3",
    amount: 789,
    avatar: "https://i.pravatar.cc/150?img=3", // Random avatar URL
    hatIcon: "https://img.icons8.com/color/48/000000/santa-hat.png",
    voted: true,
    progress: 23,
  },
  {
    id: 4,
    title: "Sample Title 4",
    amount: 321,
    avatar: "https://i.pravatar.cc/150?img=4", // Random avatar URL
    hatIcon: "https://img.icons8.com/color/48/000000/top-hat.png",
    voted: false,
    progress: 89,
  },
  {
    id: 5,
    title: "Sample Title 5",
    amount: 654,
    avatar: "https://i.pravatar.cc/150?img=5", // Random avatar URL
    hatIcon: "https://img.icons8.com/color/48/000000/clown-hat.png",
    voted: true,
    progress: 55,
  },
];

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

      <div className="px-4">
        {Votes.map((vote) => <VoteItem data={vote} key={vote.id} />)}
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
