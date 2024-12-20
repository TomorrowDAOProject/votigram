import InviteFriendsStatus from "@/components/InviteFriends";
import TaskModule from "@/components/TaskModule";
import useData from "@/hooks/useData";
import { useEffect, useState } from "react";

const Tasks = () => {
  const [taskList, setTaskList] = useState([]);

  const { data: tasks } = useData(
    "/api/app/user/task-list?chainId=tDVW"
  );

  useEffect(() => {
    if (tasks) {
      setTaskList(tasks);
    }
  }, [tasks])

  return (
    <>
      <InviteFriendsStatus value={20} />

      {taskList.map((taskSection) => <TaskModule data={taskSection} title="" />)}
    </>
  );
};

export default Tasks;
