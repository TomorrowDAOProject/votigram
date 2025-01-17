import { useEffect, useState } from "react";

import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { DayPicker, DateBefore, WeekdayProps } from "react-day-picker";

import Drawer from "../Drawer";

import "react-day-picker/style.css";

import "./index.css";

interface ISimpleDatePickerProps {
  disabled?: DateBefore;
  value?: Dayjs;
  defaultValue?: Dayjs;
  className?: string;
  onChange?: (value: string) => void;
}

const SimpleDatePicker = (props: ISimpleDatePickerProps) => {
  const {
    value,
    defaultValue,
    className,
    disabled,
    onChange,
    ...dayPickerProps
  } = props;
  // const baseValue =
  //   value && dayjs(value || "").isValid()
  //     ? value
  //     : defaultValue && dayjs(defaultValue || "").isValid()
  //     ? defaultValue
  //     : dayjs().format();
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<Dayjs>(
    value || defaultValue || dayjs()
  );

  const formatDate = (dateInput: Dayjs) => {
    const currentYear = dayjs().year();

    if (dateInput.year() === currentYear) {
      return dateInput.format("DD MMM");
    } else {
      return dateInput.format("DD MMM YYYY");
    }
  };

  const handleConfirm = () => {
    const selectedDate = selected ? dayjs(selected).format("YYYY-MM-DD") : "";
    onChange?.(selectedDate);
    setIsVisible(false);
  };

  useEffect(() => {
    if (value && dayjs(value).isValid()) {
      setSelected(value);
    }
  }, [value]);

  return (
    <>
      <div
        className={clsx(
          "relative py-[12px] pl-[14px] pr-[40px] border border-tertiary rounded-[10px]",
          className
        )}
        onClick={() => setIsVisible(true)}
        role="button"
        aria-label="select date"
      >
        <span className="block min-w-[50px] h-[20px] font-normal text-[14px] text-input-placeholder leading-[20px]">
          {selected && formatDate(selected)}
        </span>

        <i className="absolute top-1/2 right-[14px] -translate-y-1/2 votigram-icon-calendar text-input-placeholder text-[18px]" />
      </div>
      <Drawer
        isVisible={isVisible}
        direction="bottom"
        onClose={setIsVisible}
        rootClassName="px-[17.5px] pt-5 pb-7 bg-tertiary"
        role="dialog"
      >
        <DayPicker
          mode="single"
          selected={selected.toDate()}
          onSelect={(date) => date && setSelected(dayjs(date))}
          disabled={disabled}
          weekStartsOn={1}
          components={{
            Weekday: (props: WeekdayProps) => {
              return <th>{props["aria-label"]?.slice(0, 3)}</th>;
            },
          }}
          className="simple-date-picker"
          {...dayPickerProps}
        />
        <button
          type="button"
          className="w-full mt-2 mx-[2.5px] bg-primary rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[25px] text-white"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </Drawer>
    </>
  );
};

export default SimpleDatePicker;
