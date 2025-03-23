import { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";
import { StyleSheet, Dimensions, Platform } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 45 : 0;

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.base, styles.success]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.hidden}
      text2Style={styles.message}
      text1NumberOfLines={0}
      text2NumberOfLines={2}
      renderLeadingIcon={() => null}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={[styles.base, styles.error]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.hidden}
      text2Style={styles.message}
      text1NumberOfLines={0}
      text2NumberOfLines={2}
      renderLeadingIcon={() => null}
    />
  ),
  info: (props: any) => (
    <InfoToast
      {...props}
      style={[styles.base, styles.info]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.hidden}
      text2Style={styles.message}
      text1NumberOfLines={0}
      text2NumberOfLines={2}
      renderLeadingIcon={() => null}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={[styles.base, styles.warning]}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.hidden}
      text2Style={styles.message}
      text1NumberOfLines={0}
      text2NumberOfLines={2}
      renderLeadingIcon={() => null}
    />
  ),
};

const styles = StyleSheet.create({
  base: {
    width: SCREEN_WIDTH,
    borderLeftWidth: 0,
    height: "auto",
    minHeight: 55,
    paddingVertical: 8,
    paddingTop: STATUSBAR_HEIGHT + 8,
    marginTop: 0,
    borderRadius: 0,
    elevation: 10,
    zIndex: 999999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "absolute",
    top: 0,
    left: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  hidden: {
    display: "none",
    height: 0,
  },
  message: {
    fontSize: 15,
    color: "#FFFFFF",
    fontFamily: "Inter-Medium",
    textAlign: "center",
  },
  success: {
    backgroundColor: "#4CAF50",
  },
  error: {
    backgroundColor: "#F44336",
  },
  info: {
    backgroundColor: "#2196F3",
  },
  warning: {
    backgroundColor: "#FFC107",
  },
});
