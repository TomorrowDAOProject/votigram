import { DayPicker, WeekdayProps } from "react-day-picker";
import "react-day-picker/style.css";
import Drawer from "../Drawer";
import "./index.css";
import { useState } from "react";
import dayjs from "dayjs";
interface ISimpleDatePickerProps {
  isVisible?: boolean;
  mode?: "single" | "multiple" | "range";
  onChange?: (value: string) => void;
}

const SimpleDatePicker = (props: ISimpleDatePickerProps) => {
  const { isVisible, onChange, ...dayPickerProps } = props;
  const [selected, setSelected] = useState<Date>();

  const handleConfirm = () => {
    onChange?.(selected ? dayjs(selected).format("YYYY-MM-DD") : "");
  };

  return (
    <Drawer
      isVisible={isVisible}
      direction="bottom"
      rootClassName="px-[17.5px] pt-5 pb-7 bg-tertiary"
    >
      <DayPicker
        {...dayPickerProps}
        mode="single"
        selected={selected}
        onSelect={setSelected}
        captionLayout="dropdown"
        weekStartsOn={1}
        components={{
          Weekday: (props: WeekdayProps) => {
            return <th>{props['aria-label']?.slice(0, 3)}</th>;
          }
        }}
        className="simple-date-picker"
      />
      <button
        className="w-full mt-2 mx-[2.5px] bg-primary rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[25px]"
        onClick={handleConfirm}
      >
        Confirm
      </button>
    </Drawer>
  );
};

export default SimpleDatePicker;
