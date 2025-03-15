import Checkbox from "expo-checkbox";
import Svg, { Path } from "react-native-svg";
import { Swipeable } from "react-native-gesture-handler";
import { Trash2 } from "lucide-react-native";
import { View, Text, Pressable, Animated } from "react-native";

interface TodoProps {
  id: string;
  title: string;
  category: {
    name: string;
    color: string;
    bgColor: string;
  };
  isChecked: boolean;
  subTodos: {
    id: string;
    title: string;
    isChecked: boolean;
  }[];
  onPress: () => void;
  toggleTodo: (todoId: string, subTodoId?: string) => void;
}

const Todo = ({
  id,
  title,
  category,
  isChecked,
  subTodos,
  onPress,
  toggleTodo,
}: TodoProps) => {
  const handleDeleteTodo = (todoId: string) => {
    console.log("delete todo", todoId);
  };


  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    todoId: string
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
          <Trash2 strokeWidth={1.5} color={"white"} width={25} height={25} />
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View>
      <Swipeable
        overshootRight={false}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, id)
        }
      >
        <Pressable className="bg-white active:opacity-70" onPress={onPress}>
          <View className="flex-row items-center gap-2 mb-3">
            <Checkbox
              value={isChecked}
              onValueChange={() => toggleTodo(id)}
              style={{
                width: 20,
                height: 20,
                borderWidth: 1,
                borderColor: "#D6D6D6",
                borderRadius: 4,
              }}
              color={isChecked ? "#393433" : undefined}
            />

            <View className="my-3 mx-2 flex items-start gap-2">
              <Text className="text-primary font-imedium text-[17px]">
                {title}
              </Text>

              <View
                className={`bg-${category.bgColor} rounded flex items-center justify-center h-[20px] self-start px-2`}
              >
                <Text
                  className={`uppercase ${category.color} font-imedium text-[12px]`}
                >
                  {category.name}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Swipeable>

      {subTodos.map((subTodo) => (
        <View
          key={subTodo.id}
          className="flex-row item-center gap-2 ml-12 mt-2 mb-3"
        >
          <Checkbox
            value={subTodo.isChecked}
            onValueChange={() => toggleTodo(id, subTodo.id)}
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
  );
};

export default Todo;
