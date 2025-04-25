import Axios from "@/app/config/axios";

export interface ITodo {
  title: string;
  category: number;
  subTasks: {
    id: number;
    title: string;
    isDone: boolean;
  }[];
  dueTime?: Date;
}

export const createTodo = async (todo: any) => {
  const response = await Axios.post("/todo", todo);

  return response.data;
};

