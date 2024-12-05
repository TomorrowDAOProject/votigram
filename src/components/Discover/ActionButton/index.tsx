const ActionButton = () => {
  return (
    <div className="flex absolute right-0 top-[320px] z-[10] right-[20px]">
      <div className="flex flex-col items-center gap-1">
        <div className="flex w-8 h-8 rounded-full bg-white/25 justify-center items-center">
          <i className="votigram-icon-navbar-vote text-[24px]" />
        </div>
        <span className="text-[12px] leading-[13px]">40</span>
      </div>
    </div>
  );
};

export default ActionButton;
