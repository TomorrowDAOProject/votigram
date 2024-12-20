import TaskItem from "./components/TaskItem";

interface ITaskModuleProps {
  title: string;
  description?: string;
  data: any;
}

const TaskModule = ({title, description, data}: ITaskModuleProps) => {
  return (
    <>
      <span className="block ">{title}</span>
      {description && <span className="block ">{description}</span>}

      {data?.map((task: any) => (<TaskItem data={task} key={task.id} onPressGo={() => {}} />))}
    </>
  );
};

export default TaskModule;
