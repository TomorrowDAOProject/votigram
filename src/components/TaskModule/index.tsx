import { TaskInfo } from "@/types/task";
import TaskItem from "./components/TaskItem";

interface ITaskModuleProps {
  title: string;
  description?: string;
  data: TaskInfo[];
}

const TaskModule = ({ title, description, data }: ITaskModuleProps) => {
  return (
    <div className="my-[14px]">
      <div className="mb-[14px]">
        <span className="block font-bold text-[18px] leading-[18px] text-white font-outfit">{title}</span>
        {description && <span className="block mt-[6px] text-white font-normal text-[14px] leading-[16px]">{description}</span>}
      </div>

      {data?.map((task: TaskInfo) => (
        <TaskItem data={task} key={task.userTaskDetail} onPressGo={() => {}} />
      ))}
    </div>
  );
};

export default TaskModule;
