export type TaskInfo = {
  points: number;
  userTaskDetail: string;
  complete: boolean;
  completeCount: number;
  taskCount: number;
}

export type TaskModule = {
  totalCount: number;
  userTask: string;
  data: TaskInfo[];
}
