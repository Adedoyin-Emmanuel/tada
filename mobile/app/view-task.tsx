import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";
import CheckBox, { Checkbox } from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

const ViewTask = () => {
  const handleClose = () => {
    router.dismiss();
  };

  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Drink 8 glasses of water",
      isChecked: false,
    },
    {
      id: 2,
      title: "Edit the PDF",
      isChecked: false,
    },
    {
      id: 3,
      title: "Write in a gratitude journal",
      isChecked: false,
    },

    {
      id: 4,
      title: "Call my baby girl",
      isChecked: false,
    },
  ]);

  const toggleTodo = (todoId: number, subTodoId?: number) => {
    setTodos(
      todos.map((todo) => {
        if (subTodoId) {
          if (todo.id === todoId) {
            return {
              ...todo,
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
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full p-5">
          <TouchableOpacity
            className="flex items-end justify-end p-2 mb-10"
            activeOpacity={0.7}
            onPress={handleClose}
          >
            <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <Path
                d="M21.0607 3.06066C21.6464 2.47487 21.6464 1.52513 21.0607 0.93934C20.4749 0.353553 19.5251 0.353553 18.9393 0.93934L11 8.87868L3.06066 0.93934C2.47487 0.353553 1.52513 0.353553 0.93934 0.93934C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L8.87868 11L0.93934 18.9393C0.353553 19.5251 0.353553 20.4749 0.93934 21.0607C1.52513 21.6464 2.47487 21.6464 3.06066 21.0607L11 13.1213L18.9393 21.0607C19.5251 21.6464 20.4749 21.6464 21.0607 21.0607C21.6464 20.4749 21.6464 19.5251 21.0607 18.9393L13.1213 11L21.0607 3.06066Z"
                fill="black"
              />
            </Svg>
          </TouchableOpacity>

          <Text className="text-[36px] font-imedium mt-5">
            Stretch everyday for 15 mins
          </Text>

          <View className="w-full mt-10">
            <View>
              {todos.map((todo) => (
                <View key={todo.id} className="mb-3">
                  <View className="flex-row items-center gap-2">
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
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <Pressable
            className={
              "bg-[#393433] h-[60px] rounded-[12px] flex items-center justify-center active:opacity-90 mt-10"
            }
          >
            <Text className="text-white font-imedium text-[18px]">Save</Text>
          </Pressable>
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
};

export default ViewTask;
