export type Task = {
  id: number;
  taskName: string;
  operatorId: number;
  operatorName: string;
  status: number;
  plannedDate: string | null;
  updatedAt: string;
};