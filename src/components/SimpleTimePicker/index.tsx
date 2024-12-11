import React, { useState } from "react";
import { Picker } from "react-mobile-style-picker";
import "react-mobile-style-picker/dist/index.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { HOUR_RANGE, MINUTE_RANGE, PERIOD_RANGE } from "@/constants/time-picker";

import Drawer from "../Drawer";
import "./index.css";

interface ISimpleTimePickerProps {
  isVisible?: boolean;
  onChange?(t: string): void;
}

dayjs.extend(customParseFormat);

const SimpleTimePicker = ({ isVisible, onChange }: ISimpleTimePickerProps) => {
  const [selectedHour, setSelectedHour] = useState(HOUR_RANGE[0]);
  const [selectedMinute, setSelectedMinute] = useState(MINUTE_RANGE[0]);
  const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_RANGE[0]);

  const handleConfirm = () => {
    let hour = selectedHour;

    if (selectedPeriod === "AM" && selectedHour === "12") {
      hour = "00";
    } else if (selectedPeriod === "PM" && selectedHour !== "12") {
      hour = `${parseInt(selectedHour, 10) + 12}`;
    }

    const selectTime = dayjs(`${hour}:${selectedMinute}`, "HH:mm");
    onChange?.(selectTime.format("HH:mm"));

    setSelectedHour(HOUR_RANGE[0])
    setSelectedMinute(MINUTE_RANGE[0])
    setSelectedPeriod(PERIOD_RANGE[0])
  };

  return (
    <Drawer
      isVisible={isVisible}
      direction="bottom"
      rootClassName="px-[16px] pt-5 pb-7 bg-tertiary"
    >
      <div className="flex flex-row">
        <Picker
          size={5}
          itemSize={40}
          itemWeight={80}
          className="left-picker"
          onChange={setSelectedHour}
          data-testid="hours-picker"
        >
          {HOUR_RANGE.map((item) => (
            <Picker.Item
              className="text-[15px]"
              value={item}
              key={`hours${item}`}
              data-testid={`hour-${item}`}
            >
              {item}
            </Picker.Item>
          ))}
        </Picker>
        <Picker
          size={5}
          itemSize={40}
          className="middle-picker !w-[100px]"
          onChange={setSelectedMinute}
          data-testid="minute-picker"
        >
          {MINUTE_RANGE.map((item) => (
            <Picker.Item
              className="text-[15px]"
              value={item}
              key={`minutes${item}`}
              data-testid={`minute-${item}`}
            >
              {item}
            </Picker.Item>
          ))}
        </Picker>
        <Picker
          size={5}
          itemSize={40}
          className="right-picker"
          onChange={setSelectedPeriod}
          data-testid="period-picker"
        >
          {PERIOD_RANGE.map((item) => (
            <Picker.Item
              className="text-[15px]"
              value={item}
              key={`periods${item}`}
              data-testid={`period-${item}`}
            >
              {item}
            </Picker.Item>
          ))}
        </Picker>
      </div>
      <button
        className="w-full my-4 mx-[2.5px] bg-primary rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[25px]"
        onClick={handleConfirm}
      >
        Confirm
      </button>
    </Drawer>
  );
};

export default SimpleTimePicker;
