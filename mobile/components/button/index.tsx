import { ActivityIndicator, Pressable } from "react-native";

interface ButtonProps {
  onPress: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = ({
  onPress,
  className,
  disabled,
  loading,
  children,
}: ButtonProps) => {
  return (
    <Pressable
      disabled={disabled}
      className={`flex-1 h-[60px] rounded-[12px] flex items-center justify-center bg-[#393433] ${className}`}
      onPress={onPress}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </Pressable>
  );
};

export default Button;
