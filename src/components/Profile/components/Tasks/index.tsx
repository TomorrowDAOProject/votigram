import InviteFriendsStatus from "@/components/InviteFriends";
import TaskModule from "@/components/TaskModule";
import { InviteDetail, TaskModule as TaskModuleType } from "@/types/task";
import useData from "@/hooks/useData";
import { useEffect, useState } from "react";
import { TAB_LIST } from "@/constants/navigation";
import { mutate } from "swr";
interface ITasksProps {
  switchTab: (tab: TAB_LIST) => void;
  onReward(points?: number): void;
}

const Tasks = ({ switchTab, onReward }: ITasksProps) => {
  const [tasks, setTasks] = useState<TaskModuleType[]>([]);
  const [inviteInfo, setInviteInfo] = useState<InviteDetail>();
  const [showShare, setShowShare] = useState(false);

  const { data } = useData("/api/app/user/task-list?chainId=tDVW");

  const { data: inviteDetail } = useData(
    "/api/app/referral/invite-detail?chainId=tDVW"
  );

  useEffect(() => {
    if (inviteDetail) {
      setInviteInfo(inviteDetail);
    }
  }, [inviteDetail]);

  useEffect(() => {
    const { taskList } = data || {};
    if (taskList && Array.isArray(taskList)) {
      setTasks(taskList);
    }
  }, [data, tasks]);

  const refresh = (points?: number) => {
    mutate("/api/app/user/task-list?chainId=tDVW");
    if (points) {
      onReward(points);
    }
  }
  const handleReportComplete = (task: string, taskDetail: string) => {
    const taskGroupListCopy = tasks.slice(0);
    const targetGroup = taskGroupListCopy.find((group) => group.userTask === task);
    if (targetGroup) {
      const targetItem = targetGroup.data.find((item) => item.userTaskDetail === taskDetail);
      if (targetItem) {
        targetItem.complete = true;
      }
    }
    setTasks(taskGroupListCopy);
  };

  return (
    <>
      <InviteFriendsStatus
        data={inviteInfo}
        isShowDrawer={showShare}
        onClickInvite={() => setShowShare(!showShare)}
      />

      {tasks.map(({ data, userTask }: TaskModuleType, index: number) => (
        <TaskModule
          data={data}
          title={userTask}
          switchTab={switchTab}
          toInvite={() => setShowShare(true)}
          refresh={refresh}
          description={index === 0 ? "Complete quests to earn rewards!" : ""}
          key={`${userTask}_${index}`}
          onReportComplete={handleReportComplete}
        />
      ))}
    </>
  );
};

export default Tasks;
