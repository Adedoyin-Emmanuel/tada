import Axios from "@/app/config/axios";

export const getTodoById = async (id: string) => {
  try {
    console.log(`Fetching todo with id: ${id}`);
    const response = await Axios.get(`/todo/${id}`);
    console.log("API raw response:", response);
    console.log("API response data:", JSON.stringify(response.data, null, 2));

    // The response is already in the format:
    // { code, success, message, data: { id, title, ... } }
    return response.data;
  } catch (error) {
    console.error("Error in getTodoById:", error);
    throw error;
  }
};
