import React, { useRef, useState } from "react";

interface ITextareaProps {
  placeholder?: string;
  maxLength?: number;
  rootClassName?: string;
  onSubmit?: (text: string) => void;
}

const Textarea = ({
  placeholder,
  maxLength = 500,
  rootClassName,
  onSubmit,
}: ITextareaProps) => {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
      setCharCount(newText.length);
      autoResizeTextarea();
    } else {
      setText(newText.slice(0, maxLength));
      setCharCount(maxLength);
    }
  };

  const handleSubmit = () => {
    if (text.trim().length > 0) {
      onSubmit?.(text);
      setText("");
      setCharCount(0);
      autoResizeTextarea();
    }
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 320)}px`;
    }
  };

  return (
    <div className="flex flex-row items-end gap-[8px]">
      <div className="flex flex-col py-[12px] px-[16px] bg-input rounded-[20px] flex-1">
        <textarea
          ref={textareaRef}
          className={`p-0 font-questrial text-[14px] leading-[1.2] outline-none resize-none overflow-hidden appearance-none bg-input ${rootClassName}`}
          value={text}
          maxLength={maxLength}
          onChange={handleChange}
          placeholder={placeholder || "请输入..."}
          rows={1}
        />
        <span
          className={`${
            charCount > 0 ? "inline-block" : "hidden"
          } mt-[10px] text-[11px] leading-[1.2] font-questrial text-input-placeholder ${
            charCount === maxLength ? "text-danger" : ""
          }`}
        >
          {charCount}/{maxLength}
        </span>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-tertiary w-[40px] h-[40px] flex justify-center items-center p-[8px] rounded-[20px] shrink-0"
        disabled={text.trim().length === 0}
      >
        <i
          className={`votigram-icon-send text-[24px] ${
            charCount === 0 ? "text-input-placeholder" : "text-primary"
          }`}
        />
      </button>
    </div>
  );
};

export default Textarea;
