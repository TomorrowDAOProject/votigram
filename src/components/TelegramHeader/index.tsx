import "./index.css";

interface ITelegramHeaderProps {
  title?: string;
}

const TelegramHeader = ({ title }: ITelegramHeaderProps) => {
  return (
    <div className="telegram-header-container">
      {title && (
        <span className="font-outfit text-[18px] leading-[18px] font-bold">
          {title}
        </span>
      )}
    </div>
  );
};

export default TelegramHeader;
