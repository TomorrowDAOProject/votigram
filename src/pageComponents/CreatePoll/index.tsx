import { useState } from "react";
import BackBtn from "@/components/BackBtn";
import FormItem from "@/components/FormItem";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import SimpleDatePicker from "@/components/SimpleDatePicker";
import SimpleTimePicker from "@/components/SimpleTimePicker";
import ToggleSlider from "@/components/ToggleSlider";
import { DURATION_RANGE } from "@/constants/time-picker";
import ButtonRadio from "@/components/ButtonRadio";
import Upload from "@/components/Upload";

const CreatePoll = () => {
  const [startTimeType, setStartTimeType] = useState(0);
  const [endTimeType, setEndTimeType] = useState(0);
  const [, setDuration] = useState<number>(0);

  return (
    <div className="bg-black min-h-screen pt-[23px] pb-[27px] px-[20px]">
      <BackBtn />

      <FormItem
        label="Topic"
        className="mb-2"
        errorText="this is wrong"
        required
      >
        <Input className="" showClearBtn />
      </FormItem>

      <FormItem label="Banner" className="mb-2">
        <Upload />
      </FormItem>

      <FormItem
        label="Options"
        className="mb-2"
        desc="Minimum of two different options"
        required
      >
        <InputGroup />
      </FormItem>

      <FormItem label="Poll Start Time" className="mb-2" required>
        <ToggleSlider
          items={["Now", "Specific date & time"]}
          onChange={(index) => setStartTimeType(index)}
        />
        {startTimeType === 1 && (
          <div className="flex flex-row items-center gap-[9px] mt-[12px]">
            <SimpleDatePicker className="flex-1" />
            <SimpleTimePicker className="flex-1" />
          </div>
        )}
      </FormItem>

      <FormItem label="Poll End Time" required>
        <ToggleSlider
          items={["Duration", "Specific date & time"]}
          onChange={(index) => setEndTimeType(index)}
        />
        {endTimeType === 0 ? (
          <ButtonRadio className="mt-[12px]" options={DURATION_RANGE} onChange={(dura) => dura && setDuration(dura)} />
        ) : (
          <div className="flex flex-row items-center flex-wrap gap-[9px] mt-[12px]">
            <SimpleDatePicker className="flex-1" />
            <SimpleTimePicker className="flex-1" />
          </div>
        )}
      </FormItem>

      <button className="mt-[21px] w-full h-[40px] bg-primary text-white font-bold text-[14px] font-outfit rounded-[24px]">
        Create
      </button>
    </div>
  );
};

export default CreatePoll;
