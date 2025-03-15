import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

interface CancelProps {
  className?: string;
  onPress: () => void;
}

const Cancel = ({ className, onPress }: CancelProps) => {
  return (
    <TouchableOpacity
      className={`flex items-end justify-end p-2 mb-10 ${className}`}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <Path
          d="M21.0607 3.06066C21.6464 2.47487 21.6464 1.52513 21.0607 0.93934C20.4749 0.353553 19.5251 0.353553 18.9393 0.93934L11 8.87868L3.06066 0.93934C2.47487 0.353553 1.52513 0.353553 0.93934 0.93934C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L8.87868 11L0.93934 18.9393C0.353553 19.5251 0.353553 20.4749 0.93934 21.0607C1.52513 21.6464 2.47487 21.6464 3.06066 21.0607L11 13.1213L18.9393 21.0607C19.5251 21.6464 20.4749 21.6464 21.0607 21.0607C21.6464 20.4749 21.6464 19.5251 21.0607 18.9393L13.1213 11L21.0607 3.06066Z"
          fill="black"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default Cancel;
