import { PROJECT, THEME } from "@/constants/vars";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useColorScheme } from "react-native";
import updateProjectByHoursAction from "../actions/update-project-by-hours.action";

export interface UpdateTimes {
  id: number;
  total_hours: number;
  hour_for_day: number;
}

interface TypeTime {
  hour: number;
  minute: number;
  second: number;
}

interface Props {
  id: number;
  total_hours: number;
}

export function useTimerToDay({ id, total_hours }: Props) {
  const colorScheme = useColorScheme();
  const theme = THEME(colorScheme);
  const useQuery = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeTime>({
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: (value: UpdateTimes) =>
      updateProjectByHoursAction(
        value.id,
        value.total_hours,
        value.hour_for_day,
      ),
    onSuccess: async () => {
      await useQuery.invalidateQueries({ queryKey: [PROJECT] });
      reset({ hour: 0, minute: 0, second: 0 });
    },
  });

  const handlerUpdate = (data: TypeTime) => {
    let hour = Number(data.hour);
    const minute = Number(data.minute);
    const second = Number(data.second);

    if (Number.isNaN(hour)) hour = 0;

    const hour_for_day = hour * 3600 + minute * 60 + second;

    mutation.mutate({ id, total_hours, hour_for_day });
  };

  return { theme, control, handleSubmit, errors, handlerUpdate };
}
