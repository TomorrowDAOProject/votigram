import { TaskInfo } from "@/types/task";

interface ITaskItemProps {
  data: TaskInfo;
  onPressGo: () => void;
}

const TaskItem = ({ data, onPressGo }: ITaskItemProps) => {
  return (
    <div className="bg-tertiary flex items-center justify-between rounded-[12px] py-3 pl-[6px] pr-[10px] mb-2">
      <div className="flex items-center max-w-[78%] gap-[15px] flex-shrink-0 flex-grow overflow-hidden mr-[7px]">
        <div className="w-[48px] h-[34px] flex items-center justify-center shrink-0">
          <i className="votigram-icon-profile text-[32px] text-white leading-[32px]" />
        </div>
        <div className="flex flex-col items-start flex-shrink gap-1 overflow-hidden">
          <span className="font-bold truncate overflow-hidden text-ellipsis w-full text-white font-outfit leading-[14px] text-[14px]">
            {data.userTaskDetail}({data.completeCount}/{data.taskCount})
          </span>
          <span className="font-normal text-[13px] text-lime-green leading-[15.6px]">+{data.points}</span>
        </div>
      </div>

      <button
        type="button"
        disabled={data.complete}
        className="bg-primary w-[61px] shrink-0 rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[14px] text-white disabled:bg-tertiary disabled:text-input-placeholder"
        onClick={onPressGo}
      >
        Go
      </button>
    </div>
  );
};

export default TaskItem;
