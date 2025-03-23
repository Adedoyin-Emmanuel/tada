import { useState } from "react";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Fab from "@/components/fab";
import Todo from "@/components/todo";
import { toast } from "@/components/toast";
import { CategoryIcons } from "@/constants/icons";
import CategoryCard from "@/components/category-card";

const Home = () => {
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
    //toast.success("Operation successful!");
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

  return (
    <SafeAreaView className="h-full bg-white">
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView>
          <View className="w-full p-5">
            <Text className="font-ibold text-[36px]">
              Today <Text className="font-imedium opacity-[30%]">14 Mar</Text>
            </Text>

            <View className="flex-1 w-full mt-10 flex-row flex-wrap gap-4">
              <CategoryCard
                title="Health"
                count={6}
                icon={<CategoryIcons.Health />}
                bgClassName="bg-health-light"
              />

              <CategoryCard
                title="Health"
                count={5}
                icon={<CategoryIcons.Work />}
                bgClassName="bg-work-light"
              />

              <CategoryCard
                title="Mental Health"
                count={4}
                icon={<CategoryIcons.MentalHealth />}
                bgClassName="bg-mentalHealth-light"
              />

              <CategoryCard
                title="Others"
                count={13}
                icon={<CategoryIcons.Others />}
                bgClassName="bg-others-light"
              />
            </View>

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
