import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import ForYou from "@/components/ForYou";
import Home from "@/components/Home";
import Navigation from "@/components/Navigation";
import Profile from "@/components/Profile";
import Vote from "@/components/Vote";
import { chainId } from "@/constants/app";
import { RANDOM_APP_CATEGORY } from "@/constants/discover";
import { TAB_LIST } from "@/constants/navigation";
import useData, { postWithToken } from "@/hooks/useData";
import useSetSearchParams from "@/hooks/useSetSearchParams";
import { VoteApp } from "@/types/app";
import { parseStartAppParams } from "@/utils/start-params";

const App = () => {
  const currentForyouPage = useRef<number>(1);
  const [activeTab, setActiveTab] = useState(TAB_LIST.HOME);
  const [forYouList, setForYouList] = useState<VoteApp[]>([]);
  const [recommendList, setRecommendList] = useState<VoteApp[]>([]);
  const [selectedItem, setSelectItem] = useState<VoteApp>();

  const navigate = useNavigate();

  const { querys, updateQueryParam } = useSetSearchParams();
  const tab = querys.get("tab");

  const fetchForYouData = async (alias: string[] = []) => {
    const { data } = await postWithToken("/api/app/discover/random-app-list", {
      chainId,
      alias,
      category: RANDOM_APP_CATEGORY.FORYOU,
    });

    // setForYouList(data?.appList || []);;

    if (alias.length > 0) {
      currentForyouPage.current++;
    }
  };

  const { data: madeForYouResult } = useData(
    `/api/app/user/homepage/made-for-you?chainId=${chainId}`
  );

  const { data: votedAppResult } = useData(
    `/api/app/user/homepage?chainId=${chainId}`
  );

  const fetchRecommendData = async () => {
    const { data } = await postWithToken("/api/app/discover/random-app-list", {
      chainId,
      category: RANDOM_APP_CATEGORY.RECOMMEND,
    });

    setRecommendList(data?.appList || []);
  };

  useEffect(() => {
    fetchForYouData();
    fetchRecommendData();
  }, []);

  const onAppItemClick = (item?: VoteApp) => {
    if (item) {
      setSelectItem(item);
    }
    setActiveTab(TAB_LIST.FOR_YOU);
  };

  useEffect(() => {
    if (tab && !isNaN(Number(tab))) {
      setActiveTab(Number(tab));
    }
  }, [tab]);

  useEffect(() => {
    if (window?.Telegram?.WebApp?.initDataUnsafe) {
      const startParam =
        window.Telegram.WebApp.initDataUnsafe.start_param ?? "";
      const params = parseStartAppParams(startParam);
      const hasRedirect = sessionStorage.getItem("redirect");
      if (params && params.pid && !hasRedirect) {
        sessionStorage.setItem("redirect", "1");
        navigate(`/proposal/${params.pid}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab: TAB_LIST) => {
    updateQueryParam({ key: "tab", value: tab.toString() });
    setActiveTab(tab);
  };

  return (
    <>
      {activeTab === TAB_LIST.HOME && (
        <Home
          weeklyTopVotedApps={votedAppResult?.weeklyTopVotedApps}
          discoverHiddenGems={votedAppResult?.discoverHiddenGems}
          madeForYouItems={madeForYouResult?.data || []}
          onAppItemClick={onAppItemClick}
          recommendList={recommendList}
          switchTab={setActiveTab}
        />
      )}
      {activeTab === TAB_LIST.FOR_YOU && (
        <ForYou
          currentForyouPage={currentForyouPage.current}
          items={[
            {
              totalPoints: 2,
              viewed: false,
              totalLikes: 2,
              totalComments: 0,
              totalOpens: 0,
              pointsPercent: 0,
              id: "ebe620f5a176c69ad0b7ee3ca3548aaca44820804b3a16cdac5e8a8bf5e9b3aa",
              alias: "sip.tg-bot",
              title: "SIP.TG bot",
              icon: "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/ebe620f5a176c69ad0b7ee3ca3548aaca44820804b3a16cdac5e8a8bf5e9b3aa.webp",
              description:
                "Bot for setting up SIP.TG platform — the world&#39;s first solution to use Telegram Calls outside through SIP protocol.",
              editorChoice: false,
              url: "https://t.me/siptg_bot",
              longDescription:
                "SIP.tg is the world's first solution for using Telegram calls over the SIP protocol. 2 modes available:- SIP client - calls via SIP protocol;- SIP gateway - connecting Telegram to a virtual PBX.",
              screenshots: [
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/ebe620f5a176c69ad0b7ee3ca3548aaca44820804b3a16cdac5e8a8bf5e9b3aa_0.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/ebe620f5a176c69ad0b7ee3ca3548aaca44820804b3a16cdac5e8a8bf5e9b3aa_1.webp",
              ],
              categories: ["Utility"],
              createTime: "2024-09-01T00:00:00Z",
              updateTime: "2024-09-01T00:00:00Z",
              appType: "FindMini",
              creator: "System",
              loadTime: "2024-09-01T00:00:00Z",
            },
            {
              totalPoints: 15,
              viewed: false,
              totalLikes: 3,
              totalComments: 0,
              totalOpens: 0,
              pointsPercent: 0,
              id: "b6678f7c74a7b4d7d14f90e85cd27656a965155967e1d1243d011ed6da1fc1f1",
              alias: "wanderlust",
              title: "WANDERLUST",
              icon: "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/b6678f7c74a7b4d7d14f90e85cd27656a965155967e1d1243d011ed6da1fc1f1.webp",
              description:
                "Get ready to satisfy your wanderlust and discover new destinations!",
              editorChoice: false,
              url: "https://t.me/wander_lustbot",
              longDescription:
                "This bot is your travel companion that helps you discover new and exciting places to visit. Simply send a location name and the bot will generate a list of popular places to visit near that location. Whether you're looking for historical landmarks, museums, restaurants, or outdoor activities, this bot has got you covered. Get ready to plan your next adventure with ease and find new places to explore!",
              screenshots: [
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/b6678f7c74a7b4d7d14f90e85cd27656a965155967e1d1243d011ed6da1fc1f1_0.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/b6678f7c74a7b4d7d14f90e85cd27656a965155967e1d1243d011ed6da1fc1f1_1.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/b6678f7c74a7b4d7d14f90e85cd27656a965155967e1d1243d011ed6da1fc1f1_2.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/b6678f7c74a7b4d7d14f90e85cd27656a965155967e1d1243d011ed6da1fc1f1_3.webp",
              ],
              categories: ["Utility"],
              createTime: "2024-09-01T00:00:00Z",
              updateTime: "2024-09-01T00:00:00Z",
              appType: "FindMini",
              creator: "System",
              loadTime: "2024-09-01T00:00:00Z",
            },
            {
              totalPoints: 3,
              viewed: false,
              totalLikes: 3,
              totalComments: 0,
              totalOpens: 0,
              pointsPercent: 0,
              id: "628d30f267322196278e8f5bb4bd523ae6a93a6339378742f158e933a1c46859",
              alias: "payvote",
              title: "PayVote",
              icon: "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/628d30f267322196278e8f5bb4bd523ae6a93a6339378742f158e933a1c46859.webp",
              description:
                "Create a voting, share it and discover your community opinions.",
              editorChoice: false,
              url: "https://t.me/PayVote_bot",
              longDescription:
                "Create votings and share them with your friends and communities! You can choose the price of each vote, from free to the cost you want, and earn TON when people vote!",
              screenshots: [
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/628d30f267322196278e8f5bb4bd523ae6a93a6339378742f158e933a1c46859_0.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/628d30f267322196278e8f5bb4bd523ae6a93a6339378742f158e933a1c46859_1.webp",
              ],
              categories: ["Utility"],
              createTime: "2024-05-06T06:53:45.804+00:00",
              updateTime: "2024-06-17T18:46:25.791+00:00",
              appType: "Telegram",
              creator: "System",
              loadTime: "2024-10-30T04:18:22.6798677Z",
            },
            {
              totalPoints: 6,
              viewed: false,
              totalLikes: 6,
              totalComments: 0,
              totalOpens: 0,
              pointsPercent: 0,
              id: "a6cfa57b9caf6de8106959c76c916e69a65b1c582e0f518d9af4925f6a780261",
              alias: "degrees°",
              title: "Degrees°",
              icon: "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/a6cfa57b9caf6de8106959c76c916e69a65b1c582e0f518d9af4925f6a780261.webp",
              description: "Not Clicker → just Degrees°",
              editorChoice: false,
              url: "https://t.me/prodegreesbot",
              longDescription:
                "Tap! Tap! —Not often, not rarely, keep a balance.Balance is very important to achieve quality.",
              screenshots: [
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/a6cfa57b9caf6de8106959c76c916e69a65b1c582e0f518d9af4925f6a780261_0.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/a6cfa57b9caf6de8106959c76c916e69a65b1c582e0f518d9af4925f6a780261_1.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/a6cfa57b9caf6de8106959c76c916e69a65b1c582e0f518d9af4925f6a780261_2.webp",
              ],
              categories: ["Utility"],
              createTime: "2024-09-01T00:00:00Z",
              updateTime: "2024-09-01T00:00:00Z",
              appType: "FindMini",
              creator: "System",
              loadTime: "2024-09-01T00:00:00Z",
            },
            {
              totalPoints: 10388,
              viewed: false,
              totalLikes: 416,
              totalComments: 2,
              totalOpens: 0,
              pointsPercent: 0,
              id: "dae0dc6ce26c6228189f45d9769ccc2e1cb155ef01bbcdaedbf45a12b87cdda8",
              alias: "breath-of-calm",
              title: "Breath of Calm",
              icon: "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/dae0dc6ce26c6228189f45d9769ccc2e1cb155ef01bbcdaedbf45a12b87cdda8.webp",
              description:
                "Rhythmic breathing to relieve stress and anxiety. Increase concentration. Fall asleep in 20 minutes.",
              editorChoice: false,
              url: "https://t.me/bcalm_bot",
              longDescription:
                "Rhythmic breathing to relieve stress and anxiety. Increase concentration. Fall asleep in 20 minutes.",
              screenshots: [
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/dae0dc6ce26c6228189f45d9769ccc2e1cb155ef01bbcdaedbf45a12b87cdda8_0.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/dae0dc6ce26c6228189f45d9769ccc2e1cb155ef01bbcdaedbf45a12b87cdda8_1.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/dae0dc6ce26c6228189f45d9769ccc2e1cb155ef01bbcdaedbf45a12b87cdda8_2.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/dae0dc6ce26c6228189f45d9769ccc2e1cb155ef01bbcdaedbf45a12b87cdda8_3.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/dae0dc6ce26c6228189f45d9769ccc2e1cb155ef01bbcdaedbf45a12b87cdda8_4.webp",
              ],
              categories: ["Utility"],
              createTime: "2024-11-30T06:36:39.9403573Z",
              updateTime: "2024-11-30T06:36:39.9403573Z",
              appType: "FindMini",
              creator: "System",
              loadTime: "2024-11-30T06:36:39.9403573Z",
            },
            {
              totalPoints: 2,
              viewed: false,
              totalLikes: 2,
              totalComments: 0,
              totalOpens: 0,
              pointsPercent: 0,
              id: "50e7853f265a788971200ebf720d1d322acac67d7a563969f4964a3a5b886c71",
              alias: "dogeflat-bot",
              title: "Dogeflat Bot",
              icon: "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/50e7853f265a788971200ebf720d1d322acac67d7a563969f4964a3a5b886c71.webp",
              description: "A bot for Dogeflat sublet community",
              editorChoice: false,
              url: "https://t.me/DogeFlatBot",
              longDescription:
                "Dogeflat Club is a trusted community of savvy travellers, uniting top university graduates, tech professionals, business leaders, and creative minds.",
              screenshots: [
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/50e7853f265a788971200ebf720d1d322acac67d7a563969f4964a3a5b886c71_0.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/50e7853f265a788971200ebf720d1d322acac67d7a563969f4964a3a5b886c71_1.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/50e7853f265a788971200ebf720d1d322acac67d7a563969f4964a3a5b886c71_2.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/50e7853f265a788971200ebf720d1d322acac67d7a563969f4964a3a5b886c71_3.webp",
              ],
              categories: ["Utility"],
              createTime: "2024-05-11T09:34:08+00:00",
              updateTime: "2024-06-17T18:46:26.133+00:00",
              appType: "Telegram",
              creator: "System",
              loadTime: "2024-10-30T04:18:22.6798659Z",
            },
            {
              totalPoints: 0,
              viewed: false,
              totalLikes: 0,
              totalComments: 3,
              totalOpens: 0,
              pointsPercent: 0,
              id: "71c90be2629c703e3ec3f89db739cd799b8489d75f6eb9681be9138eec206c0e",
              alias: "droppy-on-sui",
              title: "Droppy on Sui",
              icon: "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/71c90be2629c703e3ec3f89db739cd799b8489d75f6eb9681be9138eec206c0e.webp",
              description: "Hello! Welcome to Droppy on Sui.",
              editorChoice: false,
              url: "https://t.me/droppy_sui_bot",
              longDescription:
                "Get ready for the next Telegram app experience on Sui, full of games, community and Droppy Drops. \uD83D\uDE08        Earn points by clicking on Droppy, playing the daily games, referring your friends and completing tasks.        What are the points for? You'll know soon!",
              screenshots: [
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/71c90be2629c703e3ec3f89db739cd799b8489d75f6eb9681be9138eec206c0e_0.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/71c90be2629c703e3ec3f89db739cd799b8489d75f6eb9681be9138eec206c0e_1.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/71c90be2629c703e3ec3f89db739cd799b8489d75f6eb9681be9138eec206c0e_2.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/71c90be2629c703e3ec3f89db739cd799b8489d75f6eb9681be9138eec206c0e_3.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/71c90be2629c703e3ec3f89db739cd799b8489d75f6eb9681be9138eec206c0e_4.webp",
              ],
              categories: ["Game", "Earn"],
              createTime: "2024-09-01T00:00:00Z",
              updateTime: "2024-09-01T00:00:00Z",
              appType: "FindMini",
              creator: "System",
              loadTime: "2024-09-01T00:00:00Z",
            },
            {
              totalPoints: 1,
              viewed: false,
              totalLikes: 1,
              totalComments: 0,
              totalOpens: 0,
              pointsPercent: 0,
              id: "46212bda40a6ab244097b60289925763089cdd598478ca9b80023e298539b8da",
              alias: "endless-siege-game",
              title: "Endless Siege Game",
              icon: "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/46212bda40a6ab244097b60289925763089cdd598478ca9b80023e298539b8da.webp",
              description:
                "The enemies are approaching, it&#39;s time to repel the attacks!",
              editorChoice: false,
              url: "https://t.me/endlesssiegegamebot",
              longDescription:
                "Endless Siege is a classic Tower Defense game where you'll have to withstand against hordes of incoming enemies!",
              screenshots: [
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/46212bda40a6ab244097b60289925763089cdd598478ca9b80023e298539b8da_0.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/46212bda40a6ab244097b60289925763089cdd598478ca9b80023e298539b8da_1.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/46212bda40a6ab244097b60289925763089cdd598478ca9b80023e298539b8da_2.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/46212bda40a6ab244097b60289925763089cdd598478ca9b80023e298539b8da_3.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/46212bda40a6ab244097b60289925763089cdd598478ca9b80023e298539b8da_4.webp",
                "https://tmrwdao-arcade.s3.amazonaws.com/votigram/test/asset/img/46212bda40a6ab244097b60289925763089cdd598478ca9b80023e298539b8da_5.webp",
              ],
              categories: ["Game"],
              createTime: "2024-09-01T00:00:00Z",
              updateTime: "2024-09-01T00:00:00Z",
              appType: "FindMini",
              creator: "System",
              loadTime: "2024-09-01T00:00:00Z",
            },
          ]}
          fetchForYouData={fetchForYouData}
        />
      )}
      {activeTab === TAB_LIST.VOTE && <Vote onAppItemClick={onAppItemClick} />}
      {activeTab === TAB_LIST.PEN && <Profile switchTab={setActiveTab} />}
      <Navigation activeTab={activeTab} onMenuClick={handleTabChange} />
    </>
  );
};

export default App;
