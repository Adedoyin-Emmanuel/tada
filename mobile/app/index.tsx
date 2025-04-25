import { useState, useEffect, useCallback } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  FlatList,
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

interface IPaginatedTodos {
  items: ITransformedTodo[];
  nextCursor: string | null;
  limit: number;
  total: number;
}

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [allTodos, setAllTodos] = useState<ITransformedTodo[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const queryClient = useQueryClient();

  const handleTodoClick = () => {
    toast.success("Operation successful!");
    router.push("/view-task");
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
    data: todosData,
    isLoading: isTodoLoading,
    isError: isTodoError,
    error: todoError,
    refetch: refetchTodos,
    isFetching: isTodoFetching,
  } = useQuery({
    queryKey: ["get-all-todos"],
    queryFn: () => getAllTodos(),
    refetchOnWindowFocus: true,
    retry: 1,
    select: (apiResponse) => {
      const items = apiResponse.data.items.map((item: ITodo) => {
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
      });

      const transformed: IPaginatedTodos = {
        items,
        nextCursor: apiResponse.data.nextCursor,
        limit: apiResponse.data.limit,
        total: apiResponse.data.total,
      };

      return transformed;
    },
  });

  const fetchMoreTodos = useCallback(async () => {
    if (!nextCursor || !hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const response = await getAllTodos(nextCursor);

      const newTodos = response.data.items.map((item: ITodo) => {
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
      });

      setAllTodos((prev) => [...prev, ...newTodos]);
      setNextCursor(response.data.nextCursor);
      setHasMore(!!response.data.nextCursor);
    } catch (error) {
      console.error("Error fetching more todos:", error);
      toast.error("Failed to load more todos");
    } finally {
      setIsLoadingMore(false);
    }
  }, [nextCursor, hasMore, isLoadingMore]);

  const renderTodoItem = ({ item }: { item: ITransformedTodo }) => (
    <View className="px-5">
      <Todo
        key={item.id}
        id={item.id}
        title={item.title}
        category={item.category}
        isDone={item.isDone}
        subTodos={item.subTodos}
        onPress={handleTodoClick}
        toggleTodo={() => {}}
      />
    </View>
  );

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <ActivityIndicator
        size="small"
        color="#393433"
        style={{ marginVertical: 20 }}
      />
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setAllTodos([]);
    setNextCursor(null);
    setHasMore(true);

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
    if (todosData) {
      setAllTodos(todosData.items);
      setNextCursor(todosData.nextCursor);
      setHasMore(!!todosData.nextCursor);
    }
  }, [todosData]);

  const renderHeader = () => (
    <View className="w-full p-5">
      <Text className="font-ibold text-[36px]">
        Today <Text className="font-imedium opacity-[30%]">{getDate()}</Text>
      </Text>

      <CategorySection isLoading={isHighlightLoading} data={todoHighlight} />
    </View>
  );

  return (
    <SafeAreaView className="h-full bg-white">
      <GestureHandlerRootView style={{ flex: 1 }}>
        {isTodoLoading && !allTodos.length ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#393433" />
          </View>
        ) : (
          <FlatList
            data={allTodos}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            contentContainerStyle={{ paddingBottom: 80 }}
            onEndReached={fetchMoreTodos}
            onEndReachedThreshold={0.5}
            className="w-full"
            refreshControl={
              <RefreshControl
                refreshing={refreshing || isHighlightFetching || isTodoFetching}
                onRefresh={onRefresh}
                tintColor="#393433"
              />
            }
          />
        )}
        <Fab />
      </GestureHandlerRootView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;
