import Axios from "@/app/config/axios";

export const getTodoHighlight = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await Axios.get("/todo/highlight");

  return response.data;
};
