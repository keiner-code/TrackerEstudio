/* eslint-disable react-hooks/exhaustive-deps */
import { SCHEDULE } from "@/constants/vars";
import {
  registerForPushNotificationAsync,
  schedulePushNotification,
} from "@/infraestructure/services/registerPushNotification";
import { getAllProjectByDayOfWeekAction } from "@/presentation/actions/get-all-project-by-day-of-week.action";
import { useQuery } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { JSX, useEffect } from "react";
import { Platform } from "react-native";

export default function InitialConfigNotificationProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const safeDay = currentDate.substring(0, 3);

  const queryProject = useQuery({
    queryKey: [SCHEDULE, safeDay],
    queryFn: () => getAllProjectByDayOfWeekAction(safeDay),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const customPushLocalNotification = async () => {
    await registerForPushNotificationAsync();

    const project = queryProject.data;

    if (project) {
      if (project.length === 0) return;
      if (project.length === 1) {
        await schedulePushNotification(
          "Hoy es dia de Practica",
          `${project[0].title} - ${project[0].language.name} : ${project[0].progress}%`,
          { data: project[0].id },
        );
        return;
      }

      const customBody = project.map((v) => {
        return `${v.title} - ${v.language.name} : ${v.progress}% \n`;
      });

      await schedulePushNotification(
        "Hoy es dia de Practica",
        customBody.join(" "),
        { data: project[0].id },
      );
    }
  };

  useEffect(() => {
    customPushLocalNotification();
    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) => value ?? []);
    }

    const notificationsListener = Notifications.addNotificationReceivedListener(
      (notification) => notification,
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log(response),
      );

    return () => {
      notificationsListener.remove();
      responseListener.remove();
    };
  }, [queryProject]);

  return children;
}
