import Axios from "@/app/config/axios";

export const updateTodo = async (id: string, data: any) => {
  const response = await Axios.put(`/todo/${id}`, data);
  return response.data;
};
