import { DayPicker, WeekdayProps } from "react-day-picker";
import "react-day-picker/style.css";
import Drawer from "../Drawer";
import "./index.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
interface ISimpleDatePickerProps {
  mode?: "single" | "multiple" | "range";
  value?: string;
  defaultVulue?: string;
  className?: string;
  onChange?(t: string): void;
}

const SimpleDatePicker = (props: ISimpleDatePickerProps) => {
  const { value, defaultVulue, className, onChange, ...dayPickerProps } = props;
  const baseValue = value && dayjs(value || "").isValid() ? value : defaultVulue && dayjs(defaultVulue || "").isValid() ? defaultVulue : dayjs().format("")
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<string>(baseValue);

  const formatDate = (dateInput: string) => {
    const date = dayjs(dateInput);
    const currentYear = dayjs().year();

    if (date.year() === currentYear) {
      return date.format("DD MMM");
    } else {
      return date.format("DD MMM YYYY");
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
      >
        <span className="block min-w-[50px] h-[20px] font-normal text-[14px] text-input-placeholder leading-[20px]">
          {selected && formatDate(selected)}
        </span>

        <i className="absolute top-1/2 right-[14px] -translate-y-1/2 votigram-icon-navbar-vote text-input-placeholder text-[18px]" />
      </div>
      <Drawer
        isVisible={isVisible}
        direction="bottom"
        onClose={setIsVisible}
        rootClassName="px-[17.5px] pt-5 pb-7 bg-tertiary"
      >
        <DayPicker
          {...dayPickerProps}
          mode="single"
          selected={new Date(selected)}
          onSelect={(date) =>
            date && setSelected(dayjs(date).format("YYYY-MM-DD"))
          }
          captionLayout="dropdown"
          weekStartsOn={1}
          components={{
            Weekday: (props: WeekdayProps) => {
              return <th>{props["aria-label"]?.slice(0, 3)}</th>;
            },
          }}
          className="simple-date-picker"
        />
        <button
          type="button"
          className="w-full mt-2 mx-[2.5px] bg-primary rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[25px]"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </Drawer>
    </>
  );
};

export default SimpleDatePicker;
