import { TaskInfo } from "@/types/task";
import TaskItem from "./components/TaskItem";

interface ITaskModuleProps {
  title: string;
  description?: string;
  data: TaskInfo[];
}

const TaskModule = ({ title, description, data }: ITaskModuleProps) => {
  return (
    <>
      <span className="block ">{title}</span>
      {description && <span className="block ">{description}</span>}

      {data?.map((task: TaskInfo) => (
        <TaskItem data={task} key={task.userTaskDetail} onPressGo={() => {}} />
      ))}
    </>
  );
};

export default TaskModule;
