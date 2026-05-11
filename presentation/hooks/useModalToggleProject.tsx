import { COMMENTS, LANGUAGES, PROJECT, SCHEDULE } from "@/constants/vars";
import { CreateProject, Project, UpdateProject } from "@/interfaces";
import { createProjectAction } from "@/presentation/actions/create-proyect.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import getAllLanguageAction from "../actions/get-all-language.action";
import updateProject from "../actions/update-project";

export default function useModalToggleProject(
  setModalVisible: (value: boolean) => void,
  isCreate: boolean,
  project: Project | undefined,
) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProject>({
    defaultValues: {
      title: "",
      description: "",
      language_id: "",
      study_day: "",
    },
    values: {
      title: project?.title || "",
      description: project?.description || "",
      language_id: project?.language_id?.toString() || "",
      study_day: project?.study_day || "",
    },
  });

  const queryClient = useQueryClient();

  const queryLanguages = useQuery({
    queryKey: [LANGUAGES],
    queryFn: getAllLanguageAction,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateProject) => createProjectAction(data),
    onSuccess: async (data) => {
      setModalVisible(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [PROJECT] }),
        queryClient.invalidateQueries({ queryKey: [SCHEDULE] }),
        queryClient.invalidateQueries({ queryKey: [COMMENTS] }),
      ]);

      if (data.ok) {
        reset({ description: "", language_id: "", title: "", study_day: "" });
      }
    },
    onError: (error) => {
      console.error("Error al crear el proyecto:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProject) => updateProject(data),
    onSuccess: async (_) => {
      setModalVisible(false);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [PROJECT] }),
        queryClient.invalidateQueries({ queryKey: [SCHEDULE] }),
        queryClient.invalidateQueries({ queryKey: [COMMENTS] }),
      ]);
    },
    onError: (error) => {
      console.error("Error al actualizar el proyecto:", error);
    },
  });

  const handleToggleProject = (data: CreateProject) => {
    if (isCreate) {
      createMutation.mutate(data);
      return;
    }

    if (project) {
      updateMutation.mutate({
        id: project.id,
        ...data,
      });
    }
  };

  return {
    control,
    errors,
    createMutation,
    queryLanguages,
    handleSubmit,
    handleToggleProject,
  };
}
