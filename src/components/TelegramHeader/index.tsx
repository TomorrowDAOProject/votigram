import React from "react";
import "./index.css";

interface ITelegramHeaderProps {
  title?: React.ReactNode;
}

const TelegramHeader = ({ title }: ITelegramHeaderProps) => {
  return (
    <div className="telegram-header-container">
      {title && (
        <span className="font-outfit text-[18px] leading-[18px] font-bold text-white">
          {title}
        </span>
      )}
    </div>
  );
};

export default TelegramHeader;
