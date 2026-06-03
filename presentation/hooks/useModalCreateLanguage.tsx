import { Colors } from "@/constants/colors";
import { LANGUAGES } from "@/constants/vars";
import { CreateLanguage } from "@/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, useColorScheme } from "react-native";
import { createLanguageAction } from "../actions/create-lenguage.action";
import getAllLanguageAction from "../actions/get-all-language.action";

interface Props {
  setModalVisible: (value: boolean) => void;
}

export default function useModalCreateLanguage({ setModalVisible }: Props) {
  const colorScheme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  const queryClient = useQueryClient();

  const queryLanguages = useQuery({
    queryKey: [LANGUAGES],
    queryFn: getAllLanguageAction,
  });

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
    const languages = queryLanguages.data || [];

    const existsInLanguage = languages.some(
      (v) => v.name.trim().toLowerCase() === data.name.trim().toLowerCase()
    );

    if (existsInLanguage) {
      Alert.alert(
        "Lenguaje duplicado",
        `El lenguaje "${data.name}" ya se encuentra registrado.`
      );
      return;
    }

    mutation.mutate(modifierData);
  };

  return {
    colorScheme,
    handleCreateLanguage,
  };
}
