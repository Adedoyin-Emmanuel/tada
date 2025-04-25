import Axios from "@/app/config/axios";

export const getAllTodos = async (cursor?: string | null) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const endpoint = cursor ? `/todo?cursor=${cursor}` : "/todo";
  const response = await Axios.get(endpoint);
  return response.data;
};
