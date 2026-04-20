import { COMMENTS, LANGUAGES, PROJECT, SCHEDULE } from "@/constants/vars";
import { createProject } from "@/interfaces";
import { createProjectAction } from "@/presentation/actions/create-proyect.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import getAllLanguageAction from "../actions/get-all-language.action";

export default function useModalCreate(
  setModalVisible: (value: boolean) => void,
) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createProject>();

  const queryClient = useQueryClient();

  const queryLanguages = useQuery({
    queryKey: [LANGUAGES],
    queryFn: getAllLanguageAction,
  });

  const mutation = useMutation({
    mutationFn: (data: createProject) => createProjectAction(data),
    onSuccess: (data) => {
      setModalVisible(false);
      queryClient.invalidateQueries({
        queryKey: [PROJECT, SCHEDULE, COMMENTS],
      });

      if (data.ok) {
        reset({ description: "", language_id: "", title: "", study_day: "" });
      }
    },
    onError: (error) => {
      console.error("Error al crear el proyecto:", error);
    },
  });

  const handleCreateProject = (data: createProject) => {
    mutation.mutate(data);
  };

  return {
    control,
    errors,
    mutation,
    queryLanguages,
    handleSubmit,
    handleCreateProject,
  };
}
