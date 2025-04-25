import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Checkbox } from "expo-checkbox";

type ICategory = {
  name: string;
  color: string;
  bgColor: string;
};

interface ITodoProps {
  id: string;
  title: string;
  isDone: boolean;
  category: ICategory;
  subTodos: {
    title: string;
    isDone: boolean;
  }[];
  onPress: (id: string) => void;
  toggleTodo: (id: string, subId?: number) => void;
}

const Todo = ({
  id,
  title,
  isDone,
  category,
  subTodos,
  onPress,
  toggleTodo,
}: ITodoProps) => {
  const handlePress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="p-5 rounded-2xl shadow-sm bg-white"
      style={{ shadowColor: "rgba(24, 39, 75, 0.06)" }}
    >
      <View className="flex-row items-center gap-2">
        <Checkbox
          value={isDone}
          onValueChange={() => toggleTodo(id)}
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: "#D6D6D6",
            borderRadius: 4,
          }}
          color={isDone ? "#393433" : undefined}
        />
        <View className="my-3 mx-2 flex items-start gap-2">
          <Text className="text-primary font-imedium text-[17px]">{title}</Text>
          <View className={`px-3 py-1 rounded-full bg-${category.bgColor}`}>
            <Text className={`${category.color}`}>{category.name}</Text>
          </View>
        </View>
      </View>

      {/* Sub-Todos */}
      {subTodos.length > 0 && (
        <View className="ml-8 mt-2">
          {subTodos.map((item, index) => (
            <View key={index} className="mb-2 flex-row items-center gap-2">
              <Checkbox
                value={item.isDone}
                onValueChange={() => toggleTodo(id, index)}
                style={{
                  width: 16,
                  height: 16,
                  borderWidth: 1,
                  borderColor: "#D6D6D6",
                  borderRadius: 4,
                }}
                color={item.isDone ? "#393433" : undefined}
              />
              <Text className="text-primary font-iregular text-[15px]">
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Todo;
