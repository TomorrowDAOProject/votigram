interface ITaskItemProps {
  data: any;
  onPressGo: () => void;
}

const TaskItem = ({ data, onPressGo }: ITaskItemProps) => {

  return (
    <div className="bg-tertiary flex flex-row items-center rounded-[12px] py-3 px-[10px]">
      <div className="flex items-center justify-between">

      </div>
      <button
        type="button"
        className="bg-primary rounded-[24px] text-[14px] font-bold py-[10px] font-outfit leading-[14px] text-white"
        onClick={onPressGo}
      >
        Go
      </button>
    </div>
  );
};

export default TaskItem;
