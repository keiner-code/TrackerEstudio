import { Colors } from "@/constants/colors";
import { LANGUAGES } from "@/constants/vars";
import { CreateLanguage } from "@/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useColorScheme } from "react-native";
import { createLanguageAction } from "../actions/create-lenguage.action";

interface Props {
  setModalVisible: (value: boolean) => void;
}

export default function useModalCreateLanguage({ setModalVisible }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const colorScheme = useColorScheme() === "dark" ? Colors.dark : Colors.light;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLanguage>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateLanguage) => createLanguageAction(data),
    onSuccess: () => {
      setModalVisible(false);
      queryClient.invalidateQueries({ queryKey: [LANGUAGES] });
    },
    onError: (error) => {
      console.error("Error al crear el lenguaje de programcion:", error);
    },
  });

  const handleCreateLanguage = (data: CreateLanguage) => {
    const modifierData = {
      ...data,
      project_size: 0,
    };

    mutation.mutate(modifierData);
  };

  return {
    open,
    control,
    colorScheme,
    errors,
    mutation,
    handleSubmit,
    setOpen,
    handleCreateLanguage,
  };
}
