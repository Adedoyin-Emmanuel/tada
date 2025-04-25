import Axios from "@/app/config/axios";

export const getTodoById = async (id: string) => {
  const response = await Axios.get(`/todo/${id}`);

  return response.data;
};
