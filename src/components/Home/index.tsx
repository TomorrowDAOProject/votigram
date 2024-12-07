import { useState } from "react";
import AppList from "../AppList";
import CategoryPillList from "../CategoryPillList";
import DiscoveryHiddenGems from "../DiscoveryHiddenGems";
import PointsCounter from "../PointsCounter";
import TelegramHeader from "../TelegramHeader";
import TopVotedApps from "../TopVotedApps";

const Home = () => {
  const [isSearching, setIsSearching] = useState(false);

  // useEffect(() => {
  //   const { initDataRaw } = retrieveLaunchParams();
  //   console.log(initDataRaw);
  // }, []);
  return (
    <>
      <TelegramHeader title={isSearching ? "Discover" : ""} />
      <div className="h-screen overflow-scroll pt-telegramHeader">
        <div className="font-outfit votigram-grid mt-[9px]">
          <div className="col-12 mb-[11px]">
            {isSearching ? (
              <i
                className="votigram-icon-back text-[19px] leading-[18px]"
                onClick={() => {
                  setIsSearching(false);
                }}
              />
            ) : (
              <span className="font-bold text-[20px] leading-[20px]">
                Hi, claudia 🥀
              </span>
            )}
          </div>
          <div className="col-12 bg-input gap-2 h-[41px] px-4 flex items-center rounded-3xl">
            <i className="votigram-icon-search text-input-placeholder" />
            <input
              className="w-full bg-transparent placeholder:leading-[19.6px] text-[14px] placeholder:text-input-placeholder placeholder:font-questrial"
              placeholder="Search..."
              onFocus={() => {
                setIsSearching(true);
              }}
            />
          </div>
        </div>
        <CategoryPillList />
        <div className="mb-[22px] votigram-grid gap-[9px]">
          <div className="col-6 p-[13px] flex flex-col gap-[7px] relative h-[230px] bg-secondary text-black rounded-[18px]">
            <img
              src="https://cdn.tmrwdao.com/votigram/assets/imgs/3F37AB0AEBE1.webp"
              className="left-0 bottom-0 absolute w-[118px]"
            />
            <div className="flex bg-[#00000038] rounded-full w-[32px] aspect-square justify-center items-center">
              <i className="votigram-icon-chat-bubble text-[20px] text-white opacity-40" />
            </div>
            <span className="text-[12px] leading-[13px] font-normal">
              Community Leaderboard
            </span>
            <span className="font-outfit text-xl font-bold w-[127px] leading-[20px]">
              Vote for your favourite TMAs
            </span>
          </div>
          <div className="col-6 h-[230px] flex flex-col gap-[10px]">
            <div className="col-12 p-[13px] flex-1 bg-tertiary rounded-[18px]">
              <div className="flex bg-[#00000038] rounded-full w-[32px] aspect-square justify-center items-center">
                <i className="votigram-icon-navbar-for-you text-[20px] text-white opacity-40" />
              </div>
              <span className="text-[12px] text-white leading-[13px] font-normal">
                Browse TMAs
              </span>
            </div>
            <div className="col-12 p-[13px] flex-1 bg-primary rounded-[18px] relative">
              <img
                src="https://cdn.tmrwdao.com/votigram/assets/imgs/E0454AB5B2E6.webp"
                className="absolute right-[25px] top-0 w-[45px]"
              />
              <div className="flex bg-[#00000038] rounded-full w-[32px] aspect-square justify-center items-center">
                <i className="votigram-icon-profile text-[20px] text-white opacity-40" />
              </div>
              <span className="text-[12px] text-white leading-[13px] font-normal">
                My Profile
              </span>
              <div className="flex gap-1 absolute bottom-[12px] items-end">
                <PointsCounter end={11200000} duration={1000} />
                <span className="text-[11px] text-white leading-[13px] font-normal">
                  points
                </span>
              </div>
            </div>
          </div>
        </div>
        <TopVotedApps
          items={[
            {
              title: "title1",
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100000,
            },
            {
              title: "title2",
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100001,
            },
            {
              title: "title3",
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100002,
            },
            {
              title: "title4",
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100003,
            },
            {
              title: "title5",
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100003,
            },
            {
              title: "title6",
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100003,
            },
            {
              title: "title7",
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100003,
            },
          ]}
        />
        <DiscoveryHiddenGems />
        <AppList
          title="Made For You"
          items={[
            {
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100003,
            },
            {
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100003,
            },
            {
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100003,
            },
            {
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100003,
            },
            {
              imageUrl:
                "https://db.stickerswiki.app/api/files/1nlpavfhdos0lje/l0yw8rraanl7tzb/avatar_oo3_ozcpwl_e_waZQrn0OXb.jpg",
              points: 100003,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Home;
