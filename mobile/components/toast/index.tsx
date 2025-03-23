import React from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onHide: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onHide }) => {
  const translateY = React.useRef(new Animated.Value(-100)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after 3 seconds
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return { backgroundColor: "#4CAF50" };
      case "error":
        return { backgroundColor: "#F44336" };
      case "warning":
        return { backgroundColor: "#FFC107" };
      case "info":
        return { backgroundColor: "#2196F3" };
      default:
        return { backgroundColor: "#333" };
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "checkcircle";
      case "error":
        return "closecircle";
      case "warning":
        return "warning";
      case "info":
        return "infocirlce";
      default:
        return "infocirlce";
    }
  };

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        getToastStyle(),
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={styles.content}>
        <AntDesign name={getIcon()} size={24} color="white" />
        <Text style={styles.message}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 9999,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  message: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Toast;
