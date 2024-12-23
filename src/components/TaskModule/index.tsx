import { TaskInfo } from "@/types/task";
import TaskItem from "./components/TaskItem";
import { TAB_LIST } from "@/constants/navigation";

interface ITaskModuleProps {
  title: string;
  description?: string;
  data: TaskInfo[];
  switchTab: (tab: TAB_LIST) => void;
  toInvite(): void;
  refresh?(): void;
}

const TaskModule = ({
  title,
  description,
  data,
  switchTab,
  toInvite,
  refresh,
}: ITaskModuleProps) => {
  return (
    <div className="my-[14px]">
      <div className="mb-[14px]">
        <span className="block font-bold text-[18px] leading-[18px] text-white font-outfit">
          {title}
        </span>
        {description && (
          <span className="block mt-[6px] text-white font-normal text-[14px] leading-[16px]">
            {description}
          </span>
        )}
      </div>

      {data?.map((task: TaskInfo) => (
        <TaskItem
          data={task}
          key={task.userTaskDetail}
          userTask={task.userTaskDetail}
          switchTab={switchTab}
          toInvite={toInvite}
          refresh={refresh}
        />
      ))}
    </div>
  );
};

export default TaskModule;
