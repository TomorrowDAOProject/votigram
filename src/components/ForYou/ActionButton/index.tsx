const ActionButton = () => {
  const onLikeClick = () => {
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
  };

  return (
    <div className="flex flex-col absolute right-0 top-[320px] z-[10] right-[20px] gap-[27px]">
      <div
        role="button"
        className="flex flex-col items-center gap-1"
        onClick={onLikeClick}
      >
        <div className="flex w-[42px] h-[42px] rounded-full bg-white/25 justify-center items-center">
          <i className="votigram-icon-navbar-vote text-[32px] text-primary" />
        </div>
        <span className="text-[12px] leading-[13px]">40</span>
      </div>
      <div role="button" className="flex flex-col items-center gap-1">
        <div className="flex w-[42px] h-[42px] rounded-full bg-white/25 justify-center items-center">
          <i className="votigram-icon-chat-bubble text-[32px] text-primary" />
        </div>
        <span className="text-[12px] leading-[13px]">40</span>
      </div>
      <div role="button" className="flex flex-col items-center gap-1">
        <div className="flex w-[42px] h-[42px] rounded-full bg-white/25 justify-center items-center">
          <i className="votigram-icon-arrow-ninety-degrees text-[26px] text-primary" />
        </div>
        <span className="text-[12px] leading-[13px]">40</span>
      </div>
    </div>
  );
};

export default ActionButton;
