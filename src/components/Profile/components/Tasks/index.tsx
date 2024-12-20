import InviteFriendsStatus from "@/components/InviteFriends";
import TaskModule from "@/components/TaskModule";
import { TaskModule as TaskModuleType } from "@/types/task";
import useData from "@/hooks/useData";
import { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskModuleType[]>([]);

  const { data } = useData("/api/app/user/task-list?chainId=tDVW");

  useEffect(() => {
    const { taskList } = data || {};
    if (taskList && Array.isArray(taskList)) {
      setTasks(taskList);
    }
  }, [data, tasks]);

  return (
    <>
      <InviteFriendsStatus value={20} />

      {tasks.map(({ data, userTask }: TaskModuleType, index: number) => (
        <TaskModule
          data={data}
          title={userTask}
          description={index === 0 ? "Complete quests to earn rewards!" : ""}
          key={`${userTask}_${index}`}
        />
      ))}
    </>
  );
};

export default Tasks;
