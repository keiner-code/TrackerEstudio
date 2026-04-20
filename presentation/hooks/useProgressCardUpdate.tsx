import { Colors } from "@/constants/colors";
import { PROJECT } from "@/constants/vars";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useColorScheme } from "react-native";
import updateProjectByProgressAction from "../actions/update-project-by-progress.action";

interface Props {
  project_id: number;
  progress: number;
}

export function usePogressCardUpdate({ project_id, progress }: Props) {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, progress }: { id: number; progress: number }) =>
      updateProjectByProgressAction(id, progress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROJECT] });
    },
  });

  const handlerUpdateProgress = (type: "add" | "remove") => {
    if (type === "add") {
      mutation.mutate({ id: project_id, progress: progress + 1 });
    } else {
      mutation.mutate({ id: project_id, progress: progress - 1 });
    }
  };
  return { theme, handlerUpdateProgress };
}
