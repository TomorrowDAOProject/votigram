import { UserTaskDetail } from "@/constants/task";
import { useConfig } from "@/provider/types/ConfigContext";
import { TaskInfo } from "@/types/task";
import { openNewPageWaitPageVisible } from "../../utils";
import { chainId } from "@/constants/app";
import { postWithToken } from "@/hooks/useData";
import { useState } from "react";
import Loading from "@/components/Loading";
import { TAB_LIST } from "@/constants/navigation";
import { useAdsgram } from "@/hooks/useAdsgram";

interface ITaskItemProps {
  userTask: string;
  data: TaskInfo;
  switchTab: (tab: TAB_LIST) => void;
  toInvite(): void;
  watchAds?(): void;
  refresh?(): void;
}

const taskItemMap: Record<string, { title: string; icon: React.ReactNode }> = {
  [UserTaskDetail.DailyViewAds]: {
    icon: <i className="votigram-icon-watch-ads" />,
    title: "Watch Ads",
  },
  [UserTaskDetail.DailyVote]: {
    icon: <i className="votigram-icon-navbar-vote" />,
    title: "Cast A Vote",
  },
  [UserTaskDetail.DailyFirstInvite]: {
    icon: <i className="votigram-icon-invite-friends" />,
    title: "Invite A Friend",
  },
  [UserTaskDetail.ExploreJoinVotigram]: {
    icon: <i className="votigram-icon-telegram-logo" />,
    title: "Join Votigram TG Channel",
  },
  [UserTaskDetail.ExploreFollowVotigramX]: {
    icon: <i className="votigram-icon-twitter-x" />,
    title: "Follow Votigram on X",
  },
  [UserTaskDetail.ExploreForwardVotigramX]: {
    icon: <i className="votigram-icon-twitter-x" />,
    title: "RT Votigram Post on X",
  },
  [UserTaskDetail.ExploreSchrodinger]: {
    icon: <i className="votigram-icon-schrondinger-logo" />,
    title: "Join Schrondinger's Cat",
  },
  [UserTaskDetail.ExploreJoinTgChannel]: {
    icon: <i className="votigram-icon-telegram-logo" />,
    title: "Join TMRWDAO TG Channel",
  },
  [UserTaskDetail.ExploreFollowX]: {
    icon: <i className="votigram-icon-twitter-x" />,
    title: "Follow TMRWDAO on X",
  },
  [UserTaskDetail.ExploreForwardX]: {
    icon: <i className="votigram-icon-twitter-x" />,
    title: "RT TMRWDAO Post on X",
  },
  [UserTaskDetail.ExploreCumulateFiveInvite]: {
    icon: <i className="votigram-icon-invite-friends" />,
    title: "Invite 5 Friends",
  },
  [UserTaskDetail.ExploreCumulateTenInvite]: {
    icon: <i className="votigram-icon-invite-friends" />,
    title: "Invite 10 Friends",
  },
  [UserTaskDetail.ExploreCumulateTwentyInvite]: {
    icon: <i className="votigram-icon-invite-friends" />,
    title: "Invite 20 Friends",
  },
};

const TaskItem = ({ data, userTask, switchTab, toInvite, refresh }: ITaskItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    retweetVotigramPostURL,
    retweetTmrwdaoPostURL,
    discoverTopBannerRedirectURL,
  } = useConfig() ?? {};

  const jumpExternalList = [
    {
      taskId: UserTaskDetail.ExploreJoinVotigram,
      url: "https://t.me/votigram",
    },
    {
      taskId: UserTaskDetail.ExploreFollowVotigramX,
      url: "https://x.com/votigram",
    },
    {
      taskId: UserTaskDetail.ExploreForwardVotigramX,
      url: retweetVotigramPostURL || "",
    },
    {
      taskId: UserTaskDetail.ExploreJoinTgChannel,
      url: "https://t.me/tmrwdao",
    },
    {
      taskId: UserTaskDetail.ExploreFollowX,
      url: "https://x.com/tmrwdao",
    },
    {
      taskId: UserTaskDetail.ExploreForwardX,
      url: retweetTmrwdaoPostURL || "",
    },
    {
      taskId: UserTaskDetail.ExploreSchrodinger,
      url: discoverTopBannerRedirectURL || "",
    },
  ];

  const showAd = useAdsgram({
    blockId: import.meta.env.VITE_ADSGRAM_ID.toString() || "",
    onReward: () => refresh?.(),
    onError: () => {},
    onSkip: () => {},
  });

  const jumpAndRefresh = async (taskId: UserTaskDetail) => {
    try {
      const jumpItem = jumpExternalList.find(
        (item) => item.taskId === data.userTaskDetail
      );
      if (jumpItem) {
        setIsLoading(true);
        const isComplete = await openNewPageWaitPageVisible(
          jumpItem.url,
          taskId,
          () =>
            postWithToken("/api/app/user/complete-task", {
              chainId,
              userTask: userTask,
              userTaskDetail: taskId,
            })
        );
        if (isComplete) return;
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    if (isLoading || data.complete) return;
    switch (data.userTaskDetail) {
      case UserTaskDetail.DailyViewAds:
        showAd();
        break;
      case UserTaskDetail.DailyVote:
        switchTab(TAB_LIST.VOTE);
        break;
      case UserTaskDetail.ExploreJoinVotigram:
      case UserTaskDetail.ExploreFollowVotigramX:
      case UserTaskDetail.ExploreForwardVotigramX:
      case UserTaskDetail.ExploreJoinTgChannel:
      case UserTaskDetail.ExploreFollowX:
      case UserTaskDetail.ExploreForwardX:
      case UserTaskDetail.ExploreSchrodinger:
        await jumpAndRefresh(data.userTaskDetail);
        break;
      case UserTaskDetail.DailyFirstInvite:
      case UserTaskDetail.ExploreCumulateFiveInvite:
      case UserTaskDetail.ExploreCumulateTenInvite:
      case UserTaskDetail.ExploreCumulateTwentyInvite:
        toInvite();
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-tertiary flex items-center justify-between rounded-[12px] py-3 pl-[6px] pr-[10px] mb-2">
      <div className="flex items-center max-w-[78%] gap-[15px] flex-shrink-0 flex-grow overflow-hidden mr-[7px]">
        <div className="w-[48px] h-[34px] flex items-center justify-center shrink-0 text-[32px]">
          {taskItemMap[data.userTaskDetail]?.icon}
        </div>
        <div className="flex flex-col items-start flex-shrink gap-1 overflow-hidden">
          <span className="font-bold truncate overflow-hidden text-ellipsis w-full text-white font-outfit leading-[14px] text-[14px]">
            {taskItemMap[data.userTaskDetail]?.title}{" "}
            {data.taskCount !== 0 &&
              `(${data.completeCount}/${data.taskCount})`}
          </span>
          <span className="font-normal text-[13px] text-lime-green leading-[15.6px]">
            +{data.points}
          </span>
        </div>
      </div>

      <button
        type="button"
        disabled={data.complete || isLoading}
        className="bg-primary w-[61px] shrink-0 rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[14px] text-white disabled:bg-black disabled:text-input-placeholder"
        onClick={handleClick}
      >
        {!isLoading ? (
          "Go"
        ) : (
          <Loading
            className="bg-transparent"
            iconClassName="!border-input-placeholder w-[14px] h-[14px]"
          />
        )}
      </button>
    </div>
  );
};

export default TaskItem;
