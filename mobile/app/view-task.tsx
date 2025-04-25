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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";

import Cancel from "@/components/cancel";
import Button from "@/components/button";
import { toast } from "@/components/toast";
import { getTodoById } from "@/app/services/todo/get-todo-by-id";

interface ITodo {
  id: string;
  title: string;
  category: string;
  isDone: boolean;
  subTodos: {
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
        console.log("Todo API response:", JSON.stringify(response, null, 2));

        // The API returns a response with data nested under the "data" property
        if (response && response.data) {
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

  const handleClose = () => {
    // Here you would typically save changes to the backend
    router.dismiss();
    toast.success("Your changes have been saved successfully!");
  };

  const toggleTodo = (todoId: string, subTodoIndex?: number) => {
    if (!todo) return;

    if (subTodoIndex !== undefined) {
      setTodo({
        ...todo,
        subTodos: todo.subTodos.map((subTodo, index) =>
          index === subTodoIndex
            ? { ...subTodo, isDone: !subTodo.isDone }
            : subTodo
        ),
      });
    } else {
      setTodo({
        ...todo,
        isDone: !todo.isDone,
      });
    }
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
    if (!todo) return;

    const updatedSubTodos = todo.subTodos.filter((_, i) => i !== index);

    setTodo({
      ...todo,
      subTodos: updatedSubTodos,
    });
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
    <SafeAreaView className="h-full relative">
      <ScrollView className="mb-20">
        <View className="w-full p-5 pb-24">
          <Cancel onPress={handleClose} />

          <TextInput
            className="text-[36px] font-imedium mt-5 border-b border-gray-200 pb-2"
            value={editedTitle}
            onChangeText={setEditedTitle}
            onEndEditing={() =>
              setTodo(todo ? { ...todo, title: editedTitle } : null)
            }
          />

          <Text className="text-gray-500 mt-2">
            Created {formattedCreatedDate}
          </Text>

          <View className="mt-4 flex-row items-center">
            <Text className="text-gray-700 font-imedium">Due: </Text>
            <Text className="text-gray-700 ml-1">
              {todo.dueTime
                ? dayjs(todo.dueTime).format("MMM D, YYYY")
                : "No due date set"}
            </Text>
          </View>

          <View className="w-full mt-10">
            <Text className="text-[22px] font-ibold mb-4">Subtasks</Text>

            <View>
              {todo.subTodos.map((subTodo, index) => (
                <View key={index} className="mb-3">
                  <View className="flex-row items-center">
                    <Checkbox
                      value={subTodo.isDone}
                      onValueChange={() => toggleTodo(todo.id, index)}
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderColor: "#D6D6D6",
                        borderRadius: 4,
                      }}
                      color={subTodo.isDone ? "#393433" : undefined}
                    />

                    <View className="flex-1 mx-2">
                      {editingSubTodoIndex === index ? (
                        <TextInput
                          className="border-b border-gray-400 py-1 text-[17px] flex-1"
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

                    <TouchableOpacity
                      onPress={() => deleteSubTodo(index)}
                      className="p-2"
                    >
                      <Ionicons name="trash-outline" size={18} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              <View className="mt-4 flex-row items-center border-b border-gray-300 pb-2">
                <TextInput
                  className="flex-1 text-[17px]"
                  placeholder="Add a new subtask..."
                  value={newSubTodoText}
                  onChangeText={setNewSubTodoText}
                  onSubmitEditing={addNewSubTodo}
                />
                <TouchableOpacity
                  onPress={addNewSubTodo}
                  className="ml-2 p-2 bg-gray-200 rounded-full"
                  disabled={!newSubTodoText.trim()}
                >
                  <Ionicons name="add" size={18} color="#393433" />
                </TouchableOpacity>
              </View>

              {todo.subTodos.length === 0 && newSubTodoText === "" && (
                <Text className="text-gray-500 italic mt-4">
                  No subtasks available. Add one above.
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-5">
        <Button onPress={handleClose}>
          <Text className="text-white font-imedium text-[18px]">Save</Text>
        </Button>
      </View>
      <StatusBar />
    </SafeAreaView>
  );
};

export default ViewTask;
