import { useEffect, useState } from "react";

import clsx from "clsx";

type ButtonRadioOption = {
  label: string;
  value: number;
};

interface IButtonRadioProps {
  value?: number;
  className?: string;
  radioClassName?: string;
  options: ButtonRadioOption[];
  onChange?: (selectedValue: number) => void;
}

const ButtonRadio = ({
  value,
  options,
  className,
  radioClassName,
  onChange,
}: IButtonRadioProps) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>();

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <div className={clsx("grid grid-cols-3 gap-[9px]", className)}>
      {options.map((item) => (
        <div
          className={clsx(
            "py-[12px] px-[14px] border border-tertiary rounded-[10px] transition-[border] duration-200 ease-in-out",
            radioClassName,
            { "border border-white": selectedValue === item.value }
          )}
          key={item.value}
          onClick={() => handleSelect(item.value)}
        >
          <span
            className={clsx(
              "block w-full text-center font-normal text-[14px] text-input-placeholder leading-[20px] transition-[color] duration-200 ease-in-out",
              { "text-white": selectedValue === item.value }
            )}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ButtonRadio;
