import Toast from "react-native-toast-message";

export const useToast = () => {
  const showToast = (
    type: "success" | "error" | "info" | "warning",
    title: string,
    message?: string
  ) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 0,
    });
  };

  return {
    success: (title: string, message?: string) =>
      showToast("success", title, message),
    error: (title: string, message?: string) =>
      showToast("error", title, message),
    info: (title: string, message?: string) =>
      showToast("info", title, message),
    warning: (title: string, message?: string) =>
      showToast("warning", title, message),
  };
};
