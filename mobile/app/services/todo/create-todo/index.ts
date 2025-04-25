import Axios from "@/app/config/axios";

export const createTodo = async (todo: any) => {
  const response = await Axios.post("/todo", todo);

  return response.data;
};
