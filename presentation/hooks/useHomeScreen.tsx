import { COMMENTS, PROJECT, THEME, USER } from "@/constants/vars";
import { formatHour } from "@/utils/formatHour";
import { useQuery } from "@tanstack/react-query";
import { useColorScheme } from "react-native";
import { getAllCommentsByProjectIdAction } from "../actions/get-all-comments-by-project-id.action";
import { getAllProjectByDayOfWeekAction } from "../actions/get-all-project-by-day-of-week.action";
import getUserAction from "../actions/get-user.action";

export function useHomeScreen() {
  const colorScheme = useColorScheme();
  const theme = THEME(colorScheme);
  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const safeDay = currentDate.substring(0, 3);

  const queryProject = useQuery({
    queryKey: [PROJECT, safeDay],
    queryFn: () => getAllProjectByDayOfWeekAction(safeDay),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const queryUser = useQuery({
    queryKey: [USER],
    queryFn: getUserAction,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const customHourShow = () => {
    if (!queryProject.data || queryProject.data.length === 0) return "0h 0m 0s";

    const updateAt = queryProject.data[0].updated_at;

    const dateDb = new Date(updateAt);
    const currentDate = new Date();

    const dateDbConcat =
      dateDb.getFullYear() + ":" + dateDb.getMonth() + ":" + dateDb.getDay();
    const currentDateConcat =
      currentDate.getFullYear() +
      ":" +
      currentDate.getMonth() +
      ":" +
      currentDate.getDay();

    if (dateDbConcat !== currentDateConcat) {
      return "0h 0m 0s";
    }
    return formatHour(queryProject.data![0].hours_per_day);
  };

  const projectId = queryProject.data?.[0]?.id;

  const queryComments = useQuery({
    queryKey: [COMMENTS, projectId],
    queryFn: () => getAllCommentsByProjectIdAction(projectId),
    enabled: !!projectId,
  });

  return {
    queryComments,
    customHourShow,
    theme,
    currentDate,
    queryProject,
    queryUser,
  };
}
