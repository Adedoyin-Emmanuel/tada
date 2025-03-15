import { useState } from "react";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ScrollView, Pressable, Animated } from "react-native";
import { router } from "expo-router";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import Fab from "@/components/fab";
import { CategoryIcons } from "@/constants/icons";
import CategoryCard from "@/components/category-card";

const Home = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
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
      id: 2,
      title: "Edit the PDF",
      category: {
        name: "WORK",
        color: "text-work-default",
        bgColor: "work-light",
      },
      isChecked: false,
      subTodos: [{ id: 21, title: "Add executive summary", isChecked: false }],
    },
    {
      id: 3,
      title: "Write in a gratitude journal",
      category: {
        name: "Mental Health",
        color: "text-mentalHealth-default",
        bgColor: "mentalHealth-light",
      },
      isChecked: false,
      subTodos: [
        { id: 31, title: "Get a note", isChecked: false },
        { id: 32, title: "Follow the YouTube tutorial", isChecked: false },
      ],
    },

    {
      id: 4,
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
    router.push("/view-task");
  };

  const toggleTodo = (todoId: number, subTodoId?: number) => {
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

  const handleDeleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    todoId: number
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <Pressable
        onPress={() => handleDeleteTodo(todoId)}
        className="bg-red-500 h-[68px] w-[88px] justify-center items-center"
      >
        <Animated.View
          style={{
            transform: [{ scale }],
          }}
        >
          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path
              d="M3 6H5H21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Animated.View>
      </Pressable>
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
                  <View key={todo.id}>
                    <Swipeable
                      renderRightActions={(progress, dragX) =>
                        renderRightActions(progress, dragX, todo.id)
                      }
                      overshootRight={false}
                    >
                      <Pressable
                        className="bg-white active:opacity-70"
                        onPress={handleTodoClick}
                      >
                        <View className="flex-row items-center gap-2 mb-3">
                          <Checkbox
                            value={todo.isChecked}
                            onValueChange={() => toggleTodo(todo.id)}
                            style={{
                              width: 20,
                              height: 20,
                              borderWidth: 1,
                              borderColor: "#D6D6D6",
                              borderRadius: 4,
                            }}
                            color={todo.isChecked ? "#393433" : undefined}
                          />
                          <View className="my-3 mx-2 flex items-start gap-2">
                            <Text className="text-primary font-imedium text-[17px]">
                              {todo.title}
                            </Text>

                            <View
                              className={`bg-${todo.category.bgColor} rounded flex items-center justify-center h-[20px] self-start px-2`}
                            >
                              <Text
                                className={`uppercase ${todo.category.color} font-imedium text-[12px]`}
                              >
                                {todo.category.name}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    </Swipeable>

                    {/* Subtodos outside of Swipeable */}
                    {todo.subTodos.map((subTodo) => (
                      <View
                        key={subTodo.id}
                        className="flex-row items-center gap-2 ml-12 mt-2 mb-3"
                      >
                        <Checkbox
                          value={subTodo.isChecked}
                          onValueChange={() => toggleTodo(todo.id, subTodo.id)}
                          style={{
                            width: 18,
                            height: 18,
                            borderWidth: 1,
                            borderColor: "#D6D6D6",
                            borderRadius: 4,
                          }}
                          color={subTodo.isChecked ? "#393433" : undefined}
                        />
                        <View className="flex items-start">
                          <Text className="text-primary font-iregular text-[16px]">
                            {subTodo.title}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* FAB */}
        <Fab />
      </GestureHandlerRootView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;
