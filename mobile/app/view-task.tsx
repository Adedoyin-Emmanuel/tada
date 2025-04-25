import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { Checkbox } from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";
import {
  Check,
  Calendar,
  Clock,
  Trash2,
  Edit2,
  Plus,
  Save,
} from "lucide-react-native";

import Cancel from "@/components/cancel";
import Button from "@/components/button";
import { toast } from "@/components/toast";
import { getTodoById } from "@/app/services/todo/get-todo-by-id";
import { updateTodo } from "@/app/services/todo/update-todo";

interface ITodo {
  id: string;
  title: string;
  category: string;
  isDone: boolean;
  subTodos: {
    id?: string;
    title: string;
    isDone: boolean;
  }[];
  dueTime: string | null;
  createdAt: string;
  updatedAt: string;
}

const ViewTask = () => {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [todo, setTodo] = useState<ITodo | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editingSubTodoIndex, setEditingSubTodoIndex] = useState<number | null>(
    null
  );
  const [newSubTodoText, setNewSubTodoText] = useState("");
  const [editedSubTodoText, setEditedSubTodoText] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      if (!id) {
        setError("No todo ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await getTodoById(id as string);
        console.log(
          "Todo API raw response:",
          JSON.stringify(response, null, 2)
        );

        // The API returns a response with data nested under the "data" property
        if (response && response.data) {
          // Log the structure of subTodos to see if they have IDs
          console.log(
            "SubTodos structure:",
            JSON.stringify(response.data.subTodos, null, 2)
          );
          setTodo(response.data);
          setEditedTitle(response.data.title);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        console.error("Error fetching todo:", err);
        setError("Failed to fetch todo details");
        toast.error("Failed to load todo details");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSave = async () => {
    if (!todo || !id) return;

    try {
      setSaving(true);

      // Format subtodos to include id if it exists
      const formattedSubTodos = todo.subTodos.map((subTodo) => {
        const subtodoObj: any = {
          title: subTodo.title,
          isDone: subTodo.isDone,
        };

        // Include the id if it exists
        if (subTodo.id) {
          subtodoObj.id = subTodo.id;
        }

        return subtodoObj;
      });

      // Create update payload with exact structure needed by API
      const updatedTodoData = {
        title: editedTitle,
        category: todo.category,
        isDone: todo.isDone,
        subTodos: formattedSubTodos,
      };

      console.log(
        "Saving todo with data:",
        JSON.stringify(updatedTodoData, null, 2)
      );

      // Call the update API
      const response = await updateTodo(id as string, updatedTodoData);
      console.log("API Response:", JSON.stringify(response, null, 2));

      // Check for success
      if (response) {
        toast.success("Your changes have been saved successfully!");
        router.dismiss();
      } else {
        throw new Error("Failed to update todo");
      }
    } catch (err) {
      console.error("Error updating todo:", err);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const toggleTodo = (todoId: string, subTodoIndex?: number) => {
    if (!todo) return;

    // Only update local state, don't send API request
    let updatedTodo;
    if (subTodoIndex !== undefined) {
      updatedTodo = {
        ...todo,
        subTodos: todo.subTodos.map((subTodo, index) =>
          index === subTodoIndex
            ? { ...subTodo, isDone: !subTodo.isDone }
            : subTodo
        ),
      };
    } else {
      updatedTodo = {
        ...todo,
        isDone: !todo.isDone,
      };
    }

    // Update local state immediately
    setTodo(updatedTodo);
  };

  const startEditingSubTodo = (index: number) => {
    setEditingSubTodoIndex(index);
    setEditedSubTodoText(todo?.subTodos[index].title || "");
  };

  const saveSubTodoEdit = () => {
    if (editingSubTodoIndex === null || !todo) return;

    const updatedSubTodos = [...todo.subTodos];
    updatedSubTodos[editingSubTodoIndex] = {
      ...updatedSubTodos[editingSubTodoIndex],
      title: editedSubTodoText,
    };

    setTodo({
      ...todo,
      subTodos: updatedSubTodos,
    });

    setEditingSubTodoIndex(null);
  };

  const addNewSubTodo = () => {
    if (!newSubTodoText.trim() || !todo) return;

    setTodo({
      ...todo,
      subTodos: [...todo.subTodos, { title: newSubTodoText, isDone: false }],
    });

    setNewSubTodoText("");
  };

  const deleteSubTodo = (index: number) => {
    // This function is no longer needed
  };

  if (loading) {
    console.log("Still loading todo data...");
    return (
      <SafeAreaView className="h-full">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#393433" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !todo) {
    console.log("Error or no todo data:", error, todo);
    return (
      <SafeAreaView className="h-full relative">
        <ScrollView className="mb-20">
          <View className="w-full p-5 pb-24">
            <Cancel onPress={() => router.dismiss()} />
            <View className="flex-1 justify-center items-center mt-10">
              <Text className="text-lg text-red-500">
                {error || "Todo not found"}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Fixed Button at Bottom */}
        <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200">
          <Button onPress={() => router.dismiss()}>
            <Text className="text-white font-imedium text-[18px]">Back</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  console.log("Rendering todo:", JSON.stringify(todo, null, 2));
  console.log("Todo subTodos:", JSON.stringify(todo.subTodos, null, 2));

  const formattedCreatedDate = dayjs(todo.createdAt).format(
    "MMM D, YYYY [at] h:mm A"
  );

  return (
    <SafeAreaView className="h-full relative bg-white">
      <ScrollView className="mb-20">
        <View className="w-full p-5 pb-24">
          <Cancel onPress={() => router.dismiss()} />

          <TextInput
            className="text-[36px] font-imedium mt-5 pb-2"
            value={editedTitle}
            onChangeText={setEditedTitle}
            onEndEditing={() =>
              setTodo(todo ? { ...todo, title: editedTitle } : null)
            }
            placeholderTextColor="#9CA3AF"
            placeholder="Todo title"
          />

          <View className="flex-row items-center mt-2">
            <Clock size={16} color="#6B7280" />
            <Text className="text-gray-500 ml-2">
              Created {formattedCreatedDate}
            </Text>
          </View>

          <View className="mt-4 flex-row items-center ">
            <Calendar size={18} color="#4B5563" />
            <Text className="text-gray-700 font-imedium ml-2">Due: </Text>
            <Text className="text-gray-700 ml-1">
              {todo.dueTime
                ? dayjs(todo.dueTime).format("MMM D, YYYY")
                : "No due date set"}
            </Text>
          </View>

          <View className="w-full mt-8">
            <View className="flex-row items-center justify-between">
              <Text className="text-[20px] font-ibold">Subtodo</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-500 mr-2 text-[14px]">
                  {todo.subTodos.filter((st) => st.isDone).length}/
                  {todo.subTodos.length} completed
                </Text>
              </View>
            </View>

            <View className="mt-4 pt-2">
              {todo.subTodos.map((subTodo, index) => (
                <View
                  key={index}
                  className="mb-3 py-2"
                  pointerEvents="box-none"
                >
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      onPress={() => toggleTodo(todo.id, index)}
                      className="w-6 h-6 border border-gray-300 rounded-md items-center justify-center mr-2"
                      style={{
                        backgroundColor: subTodo.isDone
                          ? "#393433"
                          : "transparent",
                      }}
                      activeOpacity={0.7}
                    >
                      {subTodo.isDone && <Check size={14} color="#fff" />}
                    </TouchableOpacity>

                    <View className="flex-1 mx-2">
                      {editingSubTodoIndex === index ? (
                        <TextInput
                          className="py-1 text-[17px] flex-1"
                          value={editedSubTodoText}
                          onChangeText={setEditedSubTodoText}
                          autoFocus
                          onSubmitEditing={saveSubTodoEdit}
                          onBlur={saveSubTodoEdit}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => startEditingSubTodo(index)}
                          className="py-1"
                          activeOpacity={0.7}
                        >
                          <Text
                            className={`text-primary font-imedium text-[17px] ${
                              subTodo.isDone ? "line-through text-gray-400" : ""
                            }`}
                          >
                            {subTodo.title}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() => startEditingSubTodo(index)}
                        className="p-2 mr-1"
                        activeOpacity={0.7}
                      >
                        <Edit2 size={16} color="#6B7280" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}

              <View className="mt-4 flex-row items-center bg-gray-50 rounded-xl p-3">
                <TextInput
                  className="flex-1 text-[17px] pl-2"
                  placeholder="Add a new subtask..."
                  value={newSubTodoText}
                  onChangeText={setNewSubTodoText}
                  onSubmitEditing={addNewSubTodo}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={addNewSubTodo}
                  className="ml-2 p-2 bg-gray-200 rounded-full items-center justify-center"
                  disabled={!newSubTodoText.trim()}
                  style={{ opacity: newSubTodoText.trim() ? 1 : 0.5 }}
                >
                  <Plus size={18} color="#393433" />
                </TouchableOpacity>
              </View>

              {todo.subTodos.length === 0 && newSubTodoText === "" && (
                <View className="mt-6 items-center py-8 bg-gray-50 rounded-xl">
                  <Text className="text-gray-500 text-center">
                    No subtasks available yet.
                  </Text>
                  <Text className="text-gray-500 text-center mt-1">
                    Add one using the field above.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-5">
        <Button onPress={handleSave} disabled={saving}>
          {saving ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text className="text-white font-imedium text-[18px]">Save</Text>
          )}
        </Button>
      </View>
      <StatusBar />
    </SafeAreaView>
  );
};

export default ViewTask;
