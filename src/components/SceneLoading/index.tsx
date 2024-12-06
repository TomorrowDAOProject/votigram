import TelegramHeader from "../TelegramHeader";

const SceneLoading = () => {
  return (
    <>
      <TelegramHeader />
      <div className="flex bg-gradient-to-t from-black to-[#9381FF] min-h-[533px]">
        <div className="votigram-grid mt-[42px]">
          <span className="col-12 text-center font-bold text-base font-outfit">
            VOTIGRAM
          </span>
          <img
            src="https://cdn.tmrwdao.com/votigram/assets/imgs/18B98C6FFC90.webp"
            className="col-10 offset-1"
            data-testid="scene-loading-image"
          />
          <div className="flex col-12 text-[40px] flex-col text-center mb-8">
            <span className="leading-[40px] font-black font-outfit">
              YOUR <span className="text-primary">VOTE,</span>
              <br />
              YOUR <span className="text-secondary">CHOICE</span>
            </span>
          </div>
          <div
            role="progressbar"
            className="h-3 col-10 offset-1 bg-white rounded-full px-0.5 flex items-center"
          >
            <div className="h-2 bg-primary w-1/5 rounded-full" />
          </div>
          {/* <button className="bg-primary col-10 offset-1 rounded-3xl py-2.5 leading-[14px] text-[14px] font-bold font-outfit">
            Get Started!
          </button> */}
        </div>
      </div>
    </>
  );
};

export default SceneLoading;
