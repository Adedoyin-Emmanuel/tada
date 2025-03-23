import FlashMessage, {
  showMessage,
  MessageComponentProps,
} from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, Platform, View, Text } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 45 : 0;

const CustomMessage = ({ message }: MessageComponentProps) => (
  <View
    style={[styles.container, { backgroundColor: message.backgroundColor }]}
  >
    <StatusBar style="light" />
    <Text style={styles.message}>{message.message}</Text>
  </View>
);

export const FlashMessageComponent = () => (
  <FlashMessage
    position="top"
    floating={false}
    duration={2000}
    animated={true}
    renderFlashMessageIcon={() => null}
    MessageComponent={CustomMessage}
  />
);

export const toast = {
  success: (message: string) =>
    showMessage({
      message,
      type: "success",
      duration: 2000,
      backgroundColor: "#4CAF50",
      animated: true,
      icon: "none",
    }),

  error: (message: string) =>
    showMessage({
      message,
      type: "danger",
      duration: 2000,
      backgroundColor: "#F44336",
      animated: true,
      icon: "none",
    }),

  info: (message: string) =>
    showMessage({
      message,
      type: "info",
      duration: 2000,
      backgroundColor: "#2196F3",
      animated: true,
      icon: "none",
    }),

  warning: (message: string) =>
    showMessage({
      message,
      type: "warning",
      duration: 2000,
      backgroundColor: "#FFC107",
      animated: true,
      icon: "none",
    }),
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    minHeight: 35,
    paddingVertical: 8,
    paddingTop: STATUSBAR_HEIGHT + 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
  },
  message: {
    fontSize: 15,
    color: "#FFFFFF",
    marginTop: 10,
    fontFamily: "Inter-SemiBold",
    textAlign: "left",
  },
});
