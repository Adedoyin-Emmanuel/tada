import Axios from "@/app/config/axios";

export const deleteTodo = async (id: string) => {
  const response = await Axios.delete(`/todo/${id}`);
  return response.data;
};
