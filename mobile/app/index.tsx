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
              <View className="bg-health-light h-[93px] w-[48%] rounded-md justify-center gap-5 p-5">
                <Text className="font-isemibold text-[17px]">
                  6{" "}
                  <Text className="font-imedium text-[#121212] opacity-[60%]">
                    Health
                  </Text>
                </Text>
              </View>

              <View className="bg-work-light h-[93px] w-[48%] rounded-md justify-center gap-5 p-5">
                <Svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.8385 7.97062e-07H4.16146C3.63433 -1.61994e-05 3.17954 -3.08603e-05 2.80497 0.0305721C2.40963 0.0628731 2.01641 0.134189 1.63803 0.326983C1.07354 0.614603 0.614603 1.07354 0.326983 1.63803C0.134189 2.01641 0.062873 2.40963 0.030572 2.80497C-3.10745e-05 3.17954 -1.63101e-05 3.63429 8.05439e-07 4.16142V17.8385C-1.63101e-05 18.3657 -3.10745e-05 18.8205 0.030572 19.195C0.062873 19.5904 0.134189 19.9836 0.326983 20.362C0.614603 20.9265 1.07354 21.3854 1.63803 21.673C2.01641 21.8658 2.40963 21.9371 2.80497 21.9694C3.17954 22 3.6343 22 4.16144 22H13.8386C14.3657 22 14.8205 22 15.195 21.9694C15.5904 21.9371 15.9836 21.8658 16.362 21.673C16.9265 21.3854 17.3854 20.9265 17.673 20.362C17.8658 19.9836 17.9371 19.5904 17.9694 19.195C18 18.8205 18 18.3657 18 17.8386V4.16144C18 3.6343 18 3.17954 17.9694 2.80497C17.9371 2.40963 17.8658 2.01641 17.673 1.63803C17.3854 1.07354 16.9265 0.614603 16.362 0.326983C15.9836 0.134189 15.5904 0.0628731 15.195 0.0305721C14.8205 -3.08603e-05 14.3657 -1.61994e-05 13.8385 7.97062e-07ZM9 15C8.17157 15 7.5 15.6716 7.5 16.5C7.5 17.3284 8.17157 18 9 18C9.82843 18 10.5 17.3284 10.5 16.5C10.5 15.6716 9.82843 15 9 15Z"
                    fill="#46CF8B"
                  />
                </Svg>

                <Text className="font-isemibold text-[17px]">
                  5{" "}
                  <Text className="font-imedium text-[#121212] opacity-[60%]">
                    Work
                  </Text>
                </Text>
              </View>

              <View className="bg-mentalHealth-light h-[93px] w-[48%] rounded-md justify-center gap-5 p-5">
                <Text className="font-isemibold text-[17px]">
                  4{" "}
                  <Text className="font-imedium text-[#121212] opacity-[60%]">
                    Mental Health
                  </Text>
                </Text>
              </View>

              <View className="bg-others-light h-[93px] w-[48%] rounded-md justify-center gap-5 p-5">
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 6.16167C0.999984 5.63454 0.999969 5.17975 1.03057 4.80519C1.06287 4.40984 1.13419 4.01662 1.32698 3.63824C1.6146 3.07376 2.07354 2.61482 2.63803 2.3272C3.01641 2.1344 3.40963 2.06309 3.80497 2.03078C4.17955 2.00018 4.63431 2.0002 5.16145 2.00021L9.14666 2.00011C9.74022 1.99932 10.2622 1.99863 10.7421 2.16418C11.1625 2.30918 11.5454 2.54581 11.8631 2.85696C12.2258 3.21221 12.4586 3.67939 12.7234 4.21064L13.6179 6H17.2413C18.0463 5.99999 18.7106 5.99998 19.2518 6.04419C19.8139 6.09012 20.3306 6.18868 20.816 6.43598C21.5686 6.81947 22.1805 7.43139 22.564 8.18404C22.8113 8.66937 22.9099 9.18608 22.9558 9.74817C23 10.2894 23 10.9537 23 11.7587V16.2413C23 17.0463 23 17.7106 22.9558 18.2518C22.9099 18.8139 22.8113 19.3306 22.564 19.816C22.1805 20.5686 21.5686 21.1805 20.816 21.564C20.3306 21.8113 19.8139 21.9099 19.2518 21.9558C18.7106 22 18.0463 22 17.2413 22H6.75873C5.95376 22 5.28937 22 4.74818 21.9558C4.18608 21.9099 3.66938 21.8113 3.18404 21.564C2.43139 21.1805 1.81947 20.5686 1.43598 19.816C1.18868 19.3306 1.09012 18.8139 1.0442 18.2518C0.999978 17.7106 0.999988 17.0463 1 16.2413V6.16167ZM9.02229 4.00022C9.81271 4.00022 9.96938 4.01326 10.09 4.05487C10.2301 4.1032 10.3578 4.18208 10.4637 4.2858C10.5548 4.37508 10.6366 4.50938 10.99 5.21635L11.3819 6L3.00007 6C3.00052 5.53501 3.00358 5.21716 3.02393 4.96805C3.04613 4.69639 3.0838 4.59567 3.109 4.54622C3.20487 4.35806 3.35785 4.20508 3.54601 4.10921C3.59546 4.08402 3.69618 4.04634 3.96784 4.02414C4.25118 4.00099 4.62345 4.00022 5.2 4.00022H9.02229Z"
                    fill="#908986"
                  />
                </Svg>

                <Text className="font-isemibold text-[17px]">
                  13{" "}
                  <Text className="font-imedium text-[#121212] opacity-[60%]">
                    Others
                  </Text>
                </Text>
              </View>
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
