import React from "react";
import { Picker } from "react-mobile-style-picker";
import "react-mobile-style-picker/dist/index.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import Drawer from "../Drawer";
import "./index.css";

interface ISimpleTimePickerProps {
  isVisible?: boolean;
  onChange?(t: string): void;
}

dayjs.extend(customParseFormat);

const hours = Array.from(
  { length: 12 },
  (_, i) => `${i < 10 ? "0" : ""}${i + 1}`
);

const minutes = Array.from(
  { length: 60 },
  (_, i) => `${i < 10 ? "0" : ""}${i}`
);

const periods = ["AM", "PM"];

const SimpleTimePicker = ({ isVisible, onChange }: ISimpleTimePickerProps) => {
  const [selectedHour, setSelectedHour] = React.useState(hours[0]);
  const [selectedMinute, setSelectedMinute] = React.useState(minutes[0]);
  const [selectedPeriod, setSelectedPeriod] = React.useState(periods[0]);

  const handleConfirm = () => {
    const selectTime = dayjs(`${selectedHour}:${selectedMinute} ${selectedPeriod}`, 'hh:mm A');
    onChange?.(selectTime.format('HH:mm'))
  }

  console.log(isVisible)

  return (
    <Drawer
      isVisible={isVisible}
      direction="bottom"
      rootClassName="px-[16px] pt-5 pb-7 bg-tertiary"
    >
      <div className="flex flex-row">
        <Picker
          className="left-picker"
          onChange={setSelectedHour}
        >
          {hours.map((item) => (
            <Picker.Item className="text-[15px]" value={item} key={`hours${item}`}>
              {item}
            </Picker.Item>
          ))}
        </Picker>
        <Picker
          className="middle-picker !w-[100px]"
          onChange={setSelectedMinute}
        >
          {minutes.map((item) => (
            <Picker.Item
              className="text-[15px]"
              value={item}
              key={`minutes${item}`}
            >
              {item}
            </Picker.Item>
          ))}
        </Picker>
        <Picker
          className="right-picker"
          onChange={setSelectedPeriod}
        >
          {periods.map((item) => (
            <Picker.Item
              className="text-[15px]"
              value={item}
              key={`periods${item}`}
            >
              {item}
            </Picker.Item>
          ))}
        </Picker>
      </div>
      <button className="w-full mt-2 mx-[2.5px] bg-primary rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[25px]" onClick={handleConfirm}>
        Confirm
      </button>
    </Drawer>
  );
};

export default SimpleTimePicker;
