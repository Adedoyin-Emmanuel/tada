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
  Pressable,
  TextInput,
  Modal,
  Platform,
} from "react-native";
import { useState } from "react";

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
    setShowTimePicker(false);
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

          {/* Buttons */}
          <View className="flex-row items-center justify-between gap-4">
            <TouchableOpacity
              disabled={!taskText}
              onPress={() => setShowTimePicker(true)}
              className={`h-[60px] w-[60px] rounded-[12px] ${
                !taskText ? "bg-[#DEDEDE]" : "bg-[#393433]"
              } items-center justify-center`}
            >
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 12.583 22.9546 13.1555 22.8673 13.714C22.7945 14.1789 22.7581 14.4114 22.6659 14.5191C22.5671 14.6346 22.4996 14.671 22.3488 14.69C22.2081 14.7078 21.8857 14.5612 21.2408 14.2678C20.8627 14.0958 20.4425 14 20 14C18.3431 14 17 15.3431 17 17C15.3431 17 14 18.3431 14 20C14 20.4425 14.0958 20.8627 14.2678 21.2408C14.5612 21.8857 14.7078 22.2081 14.69 22.3488C14.671 22.4996 14.6346 22.5671 14.5191 22.6659C14.4114 22.7581 14.1789 22.7945 13.714 22.8673C13.1555 22.9546 12.583 23 12 23C5.92487 23 1 18.0751 1 12ZM13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.3788 11.214 12.725 11.5528 12.8944L15.5528 14.8944C16.0468 15.1414 16.6474 14.9412 16.8944 14.4472C17.1414 13.9532 16.9412 13.3526 16.4472 13.1056L13 11.382V6Z"
                  fill={taskText ? "white" : "#898989"}
                />
              </Svg>
            </TouchableOpacity>

            <Pressable
              disabled={!taskText || !selectedCategory}
              className={`flex-1 h-[60px] rounded-[12px] flex items-center justify-center ${
                !taskText || !selectedCategory ? "bg-[#DEDEDE]" : "bg-[#393433]"
              }`}
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
            </Pressable>
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
                <DateTimePicker
                  value={selectedTime || new Date()}
                  mode="time"
                  is24Hour={false}
                  display="spinner"
                  onChange={handleTimeSelect}
                />
              </View>
            </View>
          </Modal>
        )}
      </View>
      <StatusBar />
    </SafeAreaView>
  );
};

export default Add;
