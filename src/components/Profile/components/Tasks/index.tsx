import InviteFriendsStatus from "@/components/InviteFriends";
import TaskModule from "@/components/TaskModule";
import {TaskModule as TaskModuleType} from "@/types/task";
import useData from "@/hooks/useData";
import { useEffect, useState } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskModuleType[]>([]);

  const { data: { taskList } } = useData(
    "/api/app/user/task-list?chainId=tDVW"
  );

  useEffect(() => {
    if (taskList && Array.isArray(taskList)) {
      setTasks(taskList);
    }
  }, [taskList, tasks])

  return (
    <>
      <InviteFriendsStatus value={20} />

      {taskList.map(({ data, userTask }: TaskModuleType) => <TaskModule data={data} title={userTask} />)}
    </>
  );
};

export default Tasks;
