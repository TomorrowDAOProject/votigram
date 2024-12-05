interface IAppItem {
  showArrow?: boolean;
}

const AppItem = ({ showArrow = false }: IAppItem) => {
  return (
    <div className="flex gap-[18px] items-center">
      <img
        className="w-[48px] aspect-square rounded-[8px]"
        src="https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg"
        alt="Capybare"
        data-testid="app-item-icon"
      />
      <div className="flex flex-col gap-[5px]">
        <span className="font-bold text-[16px] leading-[16px] font-outfit">
          Capybare
        </span>
        <span className="font-normal text-[11px] leading-[10px] font-questrial">
          A one/2 liner sentence about the game. A one/2 liner sentence about
          the game.
        </span>
      </div>
      {showArrow && (
        <i
          data-testid="arrow-icon"
          className="votigram-icon-arrow-go text-secondary"
        />
      )}
    </div>
  );
};

export default AppItem;
