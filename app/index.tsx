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
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.9929 3.71698C9.65298 1.6721 6.19252 1.25364 3.50521 3.54973C0.598423 6.03336 0.176093 10.2162 2.47471 13.174C3.34724 14.2968 5.05023 15.9836 6.68684 17.5283C8.34261 19.0912 9.99457 20.568 10.8092 21.2895C10.8143 21.294 10.8195 21.2986 10.8248 21.3032C10.9014 21.3711 10.9967 21.4556 11.0881 21.5244C11.1975 21.6069 11.3547 21.7092 11.5645 21.7718C11.8434 21.855 12.1432 21.855 12.4221 21.7718C12.6319 21.7092 12.789 21.6069 12.8984 21.5244C12.9898 21.4556 13.0852 21.3711 13.1618 21.3032C13.167 21.2986 13.1722 21.294 13.1773 21.2895C13.992 20.568 15.6439 19.0912 17.2997 17.5283C18.9363 15.9836 20.6393 14.2968 21.5118 13.174C23.8016 10.2275 23.4445 6.01246 20.4709 3.54096C17.7537 1.28253 14.3301 1.67132 11.9929 3.71698Z"
                    fill="#7990F8"
                  />
                </Svg>

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
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5354 2.30596C16.5778 1.19507 15.0109 0.672852 13.4497 1.41786C11.6347 2.28403 10.841 4.36405 11.6109 6.19116C11.9983 7.11027 13.0462 8.7866 13.7372 9.86022C13.7426 9.86856 13.7479 9.8769 13.7533 9.88524C13.87 10.0666 13.9876 10.2494 14.1023 10.3991C14.2323 10.5686 14.3978 10.7498 14.6327 10.8959C14.9645 11.1024 15.3648 11.2097 15.7554 11.1968C16.0319 11.1877 16.2658 11.1135 16.4632 11.0317C16.6373 10.9594 16.8306 10.8599 17.0223 10.7612C17.0312 10.7566 17.04 10.7521 17.0488 10.7476C18.184 10.1633 19.9297 9.2355 20.7247 8.63319C22.2936 7.44455 22.6915 5.23787 21.5111 3.56882C20.5176 2.16393 18.918 1.82261 17.5354 2.30596Z"
                    fill="#BC5EAD"
                  />
                  <Path
                    d="M17.7089 15.8933C17.7089 16.6846 17.1855 17.3538 16.464 17.5775L16.9279 17.556C17.4349 17.556 17.9279 17.3966 18.333 17.1004L21.1619 15.0366C21.8679 14.5217 22.8561 14.5901 23.4802 15.1972C24.1734 15.8715 24.1734 16.9638 23.4802 17.6369L21.053 19.9981C20.3996 20.6336 19.5659 21.0676 18.6597 21.2441L15.229 21.9116C14.5487 22.0437 13.8473 22.0278 13.1741 21.8637L10.0712 21.1097C9.70002 21.0186 9.31948 20.973 8.9366 20.973C8.5301 20.973 8.32685 20.973 8.16378 20.9148C7.88133 20.814 7.65906 20.5917 7.55822 20.3093C7.5 20.1462 7.5 19.9429 7.5 19.5365V16.1073C7.5 15.8215 7.5 15.6786 7.5367 15.5469C7.56921 15.4302 7.62265 15.3204 7.69441 15.2228C7.77541 15.1127 7.88788 15.0245 8.11281 14.8482L9.2984 13.9186C9.2984 13.9186 11.2632 13 12.3486 13C12.7982 13 13.2455 13.0547 13.6822 13.163L16.3659 13.8301C17.1551 14.0258 17.7089 14.7313 17.7089 15.5405V15.8933Z"
                    fill="#BC5EAD"
                  />
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.47354 13C3.48235 13 3.49117 13 3.5 13C3.50884 13 3.51766 13 3.52648 13C3.73652 13 3.94115 12.9999 4.11523 13.0118C4.3056 13.0248 4.53133 13.0553 4.76537 13.1522C5.25543 13.3552 5.64477 13.7446 5.84776 14.2346C5.94471 14.4687 5.97518 14.6944 5.98817 14.8848C6.00005 15.0588 6.00003 15.2635 6.00001 15.4735C6 15.4823 6 15.4912 6 15.5L6.00001 20.5265C6.00003 20.7365 6.00005 20.9411 5.98817 21.1152C5.97518 21.3056 5.94471 21.5313 5.84776 21.7654C5.64477 22.2554 5.25543 22.6448 4.76537 22.8477C4.53133 22.9447 4.3056 22.9752 4.11523 22.9882C3.94115 23 3.73653 23 3.52648 23H3.47352C3.26348 23 3.05886 23 2.88478 22.9882C2.6944 22.9752 2.46868 22.9447 2.23464 22.8477C1.74458 22.6448 1.35523 22.2554 1.15224 21.7654C1.0553 21.5313 1.02483 21.3056 1.01184 21.1152C0.99996 20.9411 0.999981 20.7365 1 20.5265L1 15.5C1 15.4912 1 15.4823 1 15.4735C0.999981 15.2635 0.99996 15.0588 1.01184 14.8848C1.02483 14.6944 1.0553 14.4687 1.15224 14.2346C1.35523 13.7446 1.74458 13.3552 2.23464 13.1522C2.46868 13.0553 2.69441 13.0248 2.88478 13.0118C3.05886 12.9999 3.26349 13 3.47354 13Z"
                    fill="#BC5EAD"
                  />
                </Svg>

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
        <View className="absolute bottom-8 right-5">
          <Pressable
            className="bg-[#393433] h-[60px] w-[60px] rounded-full justify-center items-center shadow-lg active:opacity-90"
            onPress={() => router.push("/add")}
          >
            <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <Path
                d="M12.3334 1.66665C12.3334 0.930267 11.7364 0.333313 11 0.333313C10.2637 0.333313 9.66671 0.930267 9.66671 1.66665V9.66665H1.66671C0.930328 9.66665 0.333374 10.2636 0.333374 11C0.333374 11.7364 0.930328 12.3333 1.66671 12.3333H9.66671V20.3333C9.66671 21.0697 10.2637 21.6666 11 21.6666C11.7364 21.6666 12.3334 21.0697 12.3334 20.3333V12.3333H20.3334C21.0698 12.3333 21.6667 11.7364 21.6667 11C21.6667 10.2636 21.0698 9.66665 20.3334 9.66665H12.3334V1.66665Z"
                fill="white"
              />
            </Svg>
          </Pressable>
        </View>
      </GestureHandlerRootView>
      <StatusBar />
    </SafeAreaView>
  );
};

export default Home;
