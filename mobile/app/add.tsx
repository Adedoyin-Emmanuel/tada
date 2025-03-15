import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useState } from "react";
import Button from "@/components/button";
import Cancel from "@/components/cancel";
import { ClockIcon } from "@/constants/icons";

type Category = {
  id: number;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
};

type SubTask = {
  id: number;
  text: string;
  isChecked: boolean;
};

const Add = () => {
  const [taskText, setTaskText] = useState("");
  const [subTasks, setSubTasks] = useState<SubTask[]>([
    { id: 1, text: "", isChecked: false },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [showNewSubTask, setShowNewSubTask] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const categories: Category[] = [
    {
      id: 1,
      name: "health",
      color: "text-health-default",
      bgColor: "bg-health-light",
      borderColor: "border-health-default",
    },
    {
      id: 2,
      name: "WORK",
      color: "text-work-default",
      bgColor: "bg-work-light",
      borderColor: "border-work-default",
    },
    {
      id: 3,
      name: "Mental Health",
      color: "text-mentalHealth-default",
      bgColor: "bg-mentalHealth-light",
      borderColor: "border-mentalHealth-default",
    },
    {
      id: 4,
      name: "others",
      color: "text-others-default",
      bgColor: "bg-others-light",
      borderColor: "border-others-default",
    },
  ];

  const handleClose = () => {
    router.back();
  };

  const handleAddSubTask = () => {
    setSubTasks([
      ...subTasks,
      { id: subTasks.length + 1, text: "", isChecked: false },
    ]);
  };

  const handleSubTaskChange = (id: number, text: string) => {
    setSubTasks(
      subTasks.map((task) => (task.id === id ? { ...task, text } : task))
    );
  };

  const handleToggleSubTask = (id: number) => {
    setSubTasks(
      subTasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const handleTimeSelect = (event: any, time?: Date) => {
    if (time) {
      setSelectedTime(time);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-1">
        <ScrollView>
          <View className="w-full p-5">
            <Cancel onPress={handleClose} />

            <View>
              <TextInput
                className="text-[36px] font-imedium text-[#121212] h-[120px]"
                placeholder="Write a new task..."
                placeholderTextColor="#9CA3AF"
                value={taskText}
                onChangeText={setTaskText}
                multiline
              />
            </View>

            <View className="mt-8">
              {subTasks.map((task) => (
                <View
                  key={task.id}
                  className="flex-row items-center gap-3 mb-4"
                >
                  <Checkbox
                    value={task.isChecked}
                    onValueChange={() => handleToggleSubTask(task.id)}
                    style={{
                      width: 20,
                      height: 20,
                      borderWidth: 1,
                      borderColor: "#D6D6D6",
                      borderRadius: 4,
                    }}
                    color={task.isChecked ? "#393433" : undefined}
                  />
                  <TextInput
                    className="flex-1 text-[17px] font-iregular text-[#121212]"
                    placeholder="Add a sub-task..."
                    placeholderTextColor="#9CA3AF"
                    value={task.text}
                    onChangeText={(text) => handleSubTaskChange(task.id, text)}
                  />
                </View>
              ))}

              <TouchableOpacity
                onPress={handleAddSubTask}
                className="flex-row items-center gap-2 mt-2"
              >
                <Text className="text-[#393433] font-imedium text-[15px]">
                  + Add sub-task
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View className="absolute bottom-8 w-full px-5">
          {taskText && (
            <View className="flex-row items-center gap-2 mb-4">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-1"
              >
                <View className="flex-row gap-2">
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      onPress={() => setSelectedCategory(category)}
                      className={`${category.bgColor} rounded-md px-2 py-1.5 ${
                        selectedCategory?.id === category.id
                          ? `border-2 ${category.borderColor}`
                          : ""
                      }`}
                    >
                      <Text
                        className={`${category.color} font-imedium text-[11px] uppercase`}
                      >
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              {selectedTime && (
                <View className="bg-[#393433] rounded-md px-2 py-1.5">
                  <Text className="text-white font-imedium text-[11px]">
                    {formatTime(selectedTime)}
                  </Text>
                </View>
              )}
            </View>
          )}

          <View className="flex-row items-center justify-between gap-4">
            <TouchableOpacity
              disabled={!taskText}
              onPress={() => setShowTimePicker(true)}
              className={`h-[60px] w-[60px] rounded-[12px] ${
                !taskText ? "bg-[#DEDEDE]" : "bg-[#393433]"
              } items-center justify-center`}
            >
              <ClockIcon color={taskText ? "white" : "#898989"} />
            </TouchableOpacity>

            <Button
              disabled={!taskText || !selectedCategory}
              onPress={() => setShowTimePicker(true)}
              className={`flex-1 rounded-[12px] ${
                !taskText || !selectedCategory ? "bg-[#DEDEDE]" : "bg-[#393433]"
              } items-center justify-center`}
            >
              <Text
                className={`font-imedium text-[18px] ${
                  !taskText || !selectedCategory
                    ? "text-[#898989]"
                    : "text-white"
                }`}
              >
                Save
              </Text>
            </Button>
          </View>
        </View>

        {showTimePicker && (
          <Modal
            transparent
            animationType="fade"
            visible={showTimePicker}
            onRequestClose={() => setShowTimePicker(false)}
          >
            <View className="flex-1 bg-black/50 justify-end">
              <View className="bg-white rounded-t-[20px] p-6">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-[20px] font-imedium">Set Time</Text>
                  <TouchableOpacity onPress={() => setShowTimePicker(false)}>
                    <Text className="text-[16px] text-[#393433] font-imedium">
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="rounded-lg">
                  <DateTimePicker
                    value={selectedTime || new Date()}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handleTimeSelect}
                    textColor="#000000"
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Add;
