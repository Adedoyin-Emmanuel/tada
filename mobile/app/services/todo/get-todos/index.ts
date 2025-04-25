import Axios from "@/app/config/axios";

export const getAllTodos = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await Axios.get("/todo");
  return response.data;
};
