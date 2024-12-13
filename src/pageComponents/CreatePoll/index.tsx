import BackBtn from "@/components/BackBtn";
import FormItem from "@/components/FormItem";
import Input from "@/components/Input";
import InputGroup from "@/components/InputGroup";
import ToggleSlider from "@/components/ToggleSlider";

const CreatePoll = () => {
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
        <Input className="" showClearBtn />
      </FormItem>

      <FormItem
        label="Options"
        className="mb-2"
        desc="Minimum of two different options"
        required
      >
        <InputGroup />
      </FormItem>

      <FormItem
        label="Poll Start Time"
        className="mb-2"
        required
      >
        <ToggleSlider items={["TMAs", "Community"]} />
      </FormItem>

      <FormItem
        label="Options"
        className="mb-2"
        desc="Minimum of two different options"
        required
      >
        <InputGroup />
      </FormItem>
    </div>
  );
};

export default CreatePoll;
