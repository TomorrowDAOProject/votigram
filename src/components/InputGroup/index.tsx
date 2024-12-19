import React, { useState } from "react";
import Input from "../Input";

type Option = {
  id: number;
  value: string;
}

const InputGroup: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([
    { id: Date.now(), value: "" },
  ]);

  const addOptionAfter = (index: number) => {
    const newOption = { id: Date.now(), value: "" };
    const newOptions = [...options];
    newOptions.splice(index + 1, 0, newOption);
    setOptions(newOptions);
  };

  const addOptionToEnd = () => {
    setOptions([...options, { id: Date.now(), value: "" }]);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleInputChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].value = value;
    setOptions(newOptions);
  };

  return (
    <>
      {options.map((option, index) => (
        <div key={option.id} className="mb-[9px] flex items-center">
          <div
            onClick={() => addOptionAfter(index)}
            className="mr-[7px] flex items-center justify-center bg-tertiary w-[45px] h-[45px] rounded-[10px] text-[32px] text-white flex-none"
          >
            +
          </div>
          <Input
            value={option.value}
            onChange={(value) => handleInputChange(index, value)}
            placeholder={`Option ${index + 1}`}
            showClearBtn
          />
          <div
            onClick={() => removeOption(index)}
            className="ml-[3px] flex items-center justify-center w-[15px] h-[15px] leading-[13px] font-bold text-[16px] bg-transparent border border-input-placeholder text-input-placeholder rounded-[50%] flex-none"
          >
            -
          </div>
        </div>
      ))}
      <button
        onClick={addOptionToEnd}
        className="bg-transparent w-full h-[45px] rounded-[10px] leading-[19.6px] font-normal text-[14px] text-input-placeholder border border-dashed border-tertiary"
      >
        Add New Option
      </button>
    </>
  );
};

export default InputGroup;
