import { View, Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

const Fab = () => {
  return (
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
  );
};

export default Fab;
