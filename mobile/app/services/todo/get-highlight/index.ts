import Axios from "@/app/config/axios";

export const getTodoHighlight = async () => {
  const response = await Axios.get("/todo/highlight");
  return response.data;
};
