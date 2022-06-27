
export interface TodoItem{
  _id?: string | any;
  title: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  status?: boolean;
  important?: boolean;
  userId: string;
}
