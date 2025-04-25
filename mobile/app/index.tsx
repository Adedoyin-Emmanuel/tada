import { useState, useEffect } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Fab from "@/components/fab";
import Todo from "@/components/todo";
import { getDate } from "@/utils/get-date";
import { toast } from "@/components/toast";
import CategorySection from "@/components/category-section";
import { getAllTodos } from "@/app/services/todo/get-todos";
import { getTodoHighlight } from "@/app/services/todo/get-highlight";

interface ITodo {
  id: string;
  title: string;
  category: string;
  isDone: boolean;
  subTodos: {
    title: string;
    isDone: boolean;
  }[];
}

interface ITransformedTodo {
  id: string;
  title: string;
  isDone: boolean;
  category: {
    name: string;
    color: string;
    bgColor: string;
  };
  subTodos: {
    title: string;
    isDone: boolean;
  }[];
}

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleTodoClick = () => {
    toast.success("Operation successful!");
    //router.push("/view-task");
  };

  const {
    data: todoHighlight,
    isLoading: isHighlightLoading,
    isError,
    error,
    refetch: refetchHighlight,
    isFetching: isHighlightFetching,
  } = useQuery({
    queryKey: ["get-todo-highlight"],
    queryFn: getTodoHighlight,
    refetchOnWindowFocus: true,
    retry: 1,
    select: (apiResponse) => {
      const transformed = {
        work: apiResponse.data.workCategoryTotal,
        health: apiResponse.data.healthCategoryTotal,
        others: apiResponse.data.othersCategoryTotal,
        mentalHealth: apiResponse.data.mentalHealthCategoryTotal,
      };
      return transformed;
    },
  });

  const {
    data: todos,
    isLoading: isTodoLoading,
    isError: isTodoError,
    error: todoError,
    refetch: refetchTodos,
    isFetching: isTodoFetching,
  } = useQuery({
    queryKey: ["get-all-todos"],
    queryFn: getAllTodos,
    refetchOnWindowFocus: true,
    retry: 1,
    select: (apiResponse) => {
      const transformed: ITransformedTodo[] = apiResponse.data.items.map(
        (item: ITodo) => {
          return {
            id: item.id,
            title: item.title,
            category: {
              name:
                item.category == "MentalHealth"
                  ? "mentalHealth"
                  : item.category.toLowerCase(),
              color: `text-${
                item.category == "MentalHealth"
                  ? "mentalHealth"
                  : item.category.toLowerCase()
              }-default`,
              bgColor: `${
                item.category == "MentalHealth"
                  ? "mentalHealth"
                  : item.category.toLowerCase()
              }-light`,
            },
            isDone: item.isDone,
            subTodos: item.subTodos,
          };
        }
      );
      return transformed;
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchHighlight(), refetchTodos()]);
    } catch (error) {
      toast.error("Failed to refresh. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isError) {
      console.log(error.message);
      toast.error(`${error.message}`);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isTodoError) {
      toast.error(`${todoError.message}`);
    }
  }, [isTodoError, todoError]);

  useEffect(() => {
    if (todos) {
      console.log("Todos from DB");
      console.log(JSON.stringify(todos, null, 2));
    }
  }, [todos]);

  return (
    <SafeAreaView className="h-full bg-white">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing || isHighlightFetching || isTodoFetching}
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

            <CategorySection
              isLoading={isHighlightLoading}
              data={todoHighlight}
            />

            <View className="w-full mt-10">
              <View>
                {isTodoLoading && (
                  <ActivityIndicator className="w-full h-full" />
                )}
                {todos &&
                  todos.map((todo) => (
                    <Todo
                      key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      category={todo.category}
                      isDone={todo.isDone}
                      subTodos={todo.subTodos}
                      onPress={handleTodoClick}
                      toggleTodo={() => {}}
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
