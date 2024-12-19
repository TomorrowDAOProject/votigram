import clsx from "clsx";
import { useEffect, useState } from "react";

type ButtonRadioOption = {
  label: string;
  value: number;
};

interface IButtonRadioProps {
  className?: string;
  radioClassName?: string;
  options: ButtonRadioOption[];
  onChange?: (value?: number) => void;
}

const ButtonRadio = ({
  options,
  className,
  radioClassName,
  onChange,
}: IButtonRadioProps) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>();

  useEffect(() => {
    onChange?.(selectedValue);
  }, [onChange, selectedValue]);

  return (
    <div className={clsx("grid grid-cols-3 gap-[9px]", className)}>
      {options.map(({ label, value }) => (
        <div
          className={clsx(
            "py-[12px] px-[14px] border border-tertiary rounded-[10px] transition-[border] duration-200 ease-in-out",
            radioClassName,
            { "border border-white": selectedValue === value }
          )}
          onClick={() => setSelectedValue(value)}
        >
          <span
            className={clsx(
              "block w-full text-center font-normal text-[14px] text-input-placeholder leading-[20px] transition-[color] duration-200 ease-in-out",
              { "text-white": selectedValue === value }
            )}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ButtonRadio;
