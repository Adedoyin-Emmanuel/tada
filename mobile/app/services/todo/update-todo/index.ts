import Axios from "@/app/config/axios";

interface IUpdateTodoPayload {
  title: string;
  category: string;
  isDone: boolean;
  subTodos: Array<{
    id?: string;
    title: string;
    isDone: boolean;
  }>;
}

export const updateTodo = async (id: string, data: IUpdateTodoPayload) => {
  try {
    console.log(`Updating todo with id: ${id}`);
    console.log("Update payload:", JSON.stringify(data, null, 2));

    // Ensure we're sending the exact format required
    const response = await Axios.patch(`/todo/${id}`, {
      title: data.title,
      category: data.category,
      isDone: data.isDone,
      subTodos: data.subTodos,
    });

    console.log("Update response:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Error in updateTodo service:", error);
    throw error;
  }
};
