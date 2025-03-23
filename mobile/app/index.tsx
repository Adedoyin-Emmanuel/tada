import { useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ScrollView, RefreshControl } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Fab from "@/components/fab";
import Todo from "@/components/todo";
import { getDate } from "@/utils/get-date";
import { toast } from "@/components/toast";
import CategorySection from "@/components/category-section";
import { getTodoHighlight } from "@/app/services/todo/get-highlight";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: "1",
      title: "Drink 8 glasses of water",
      category: {
        name: "health",
        color: "text-health-default",
        bgColor: "health-light",
      },
      isChecked: false,
      subTodos: [],
    },
    {
      id: "2",
      title: "Edit the PDF",
      category: {
        name: "WORK",
        color: "text-work-default",
        bgColor: "work-light",
      },
      isChecked: false,
      subTodos: [
        { id: "21", title: "Add executive summary", isChecked: false },
      ],
    },
    {
      id: "3",
      title: "Write in a gratitude journal",
      category: {
        name: "Mental Health",
        color: "text-mentalHealth-default",
        bgColor: "mentalHealth-light",
      },
      isChecked: false,
      subTodos: [
        { id: "31", title: "Get a note", isChecked: false },
        { id: "32", title: "Follow the YouTube tutorial", isChecked: false },
      ],
    },

    {
      id: "4",
      title: "Call my baby girl",
      category: {
        name: "others",
        color: "text-others-default",
        bgColor: "others-light",
      },
      isChecked: false,
      subTodos: [],
    },
  ]);

  const handleTodoClick = () => {
    toast.success("Operation successful!");
    //router.push("/view-task");
  };

  const toggleTodo = (todoId: string, subTodoId?: string) => {
    setTodos(
      todos.map((todo) => {
        if (subTodoId) {
          if (todo.id === todoId) {
            return {
              ...todo,
              subTodos: todo.subTodos.map((subTodo) =>
                subTodo.id === subTodoId
                  ? { ...subTodo, isChecked: !subTodo.isChecked }
                  : subTodo
              ),
            };
          }
        } else if (todo.id === todoId) {
          return { ...todo, isChecked: !todo.isChecked };
        }
        return todo;
      })
    );
  };

  const {
    data: todoHighlight,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["get-todo-highlight"],
    queryFn: getTodoHighlight,
    refetchOnWindowFocus: true,
    retry: 1,
    select: (apiResponse) => {
      const transformed = {
        health: apiResponse.data.healthCategoryTotal,
        work: apiResponse.data.workCategoryTotal,
        mentalHealth: apiResponse.data.mentalHealthCategoryTotal,
        others: apiResponse.data.othersCategoryTotal,
      };
      return transformed;
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      toast.error("Failed to refresh. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  if (isError) {
    console.log(error);
    toast.error(`${error.message}`);
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isFetching}
              onRefresh={onRefresh}
              tintColor="#393433"
            />
          }
        >
          <View className="w-full p-5">
            <Text className="font-ibold text-[36px]">
              Today{" "}
              <Text className="font-imedium opacity-[30%]">{getDate()}</Text>
            </Text>

            <CategorySection isLoading={isLoading} data={todoHighlight} />

            <View className="w-full mt-10">
              <View>
                {todos.map((todo) => (
                  <Todo
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    category={todo.category}
                    isChecked={todo.isChecked}
                    subTodos={todo.subTodos}
                    onPress={handleTodoClick}
                    toggleTodo={toggleTodo}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <Fab />
      </GestureHandlerRootView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;
