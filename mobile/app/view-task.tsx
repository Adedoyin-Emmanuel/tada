import { router } from "expo-router";
import React, { useState } from "react";
import { Checkbox } from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Cancel from "@/components/cancel";
import Button from "@/components/button";
import { toast } from "@/components/toast";

const ViewTask = () => {
  const handleClose = () => {
    //router.dismiss();
    toast.success("Your changes have been saved successfully!");
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
          <Cancel onPress={handleClose} />

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

          <Button onPress={handleClose} className="mt-10">
            <Text className="text-white font-imedium text-[18px]">Save</Text>
          </Button>
        </View>
      </ScrollView>
      <StatusBar />
    </SafeAreaView>
  );
};

export default ViewTask;
