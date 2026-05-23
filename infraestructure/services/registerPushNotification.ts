import * as Notifications from "expo-notifications";
import { LogBox, Platform } from "react-native";

LogBox.ignoreLogs(["expo-notifications: Android Push notifications"]);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotificationAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "Se necesita un canal para que aparezca la solicitud de permiso.",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      sound: "notification.wav",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get permission for push notification!");
    return false;
  }
  return true;
}
