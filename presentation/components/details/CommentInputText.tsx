import { Colors } from "@/constants/colors";
import { COMMENTS, PROJECT } from "@/constants/vars";
import CreateCommentAction from "@/presentation/actions/create-comment.action";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface Props {
  project_id: number;
}

export default function CommentInputText({ project_id }: Props) {
  const [note, setNote] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: CreateCommentAction,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [PROJECT] }),
        queryClient.invalidateQueries({ queryKey: [COMMENTS] }),
      ]);
      setNote("");
    },
  });

  const handlerCreate = () => {
    if (note === "") return;
    mutation.mutate({
      content: note,
      project_id: project_id,
    });
  };

  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  return (
    <View className="mb-8 mt-2">
      <Text className="text-light-text dark:text-dark-text font-bold font-sans text-xl mb-4">
        ¿Dónde quedaste?
      </Text>
      <View className="bg-light-surface dark:bg-dark-surface rounded-3xl p-2 shadow-sm border border-transparent dark:border-dark-border">
        <TextInput
          className="text-light-text dark:text-dark-text font-sans text-base px-4 pt-4 pb-3 min-h-[90px]"
          placeholder="Ej. Terminé la refactorización pero dejé comentado el bug..."
          placeholderTextColor={theme.icon}
          multiline
          textAlignVertical="top"
          value={note}
          onChangeText={setNote}
        />
        <View className="flex-row justify-between items-center px-4 mb-2 pb-1">
          <Ionicons name="document-text-outline" size={20} color={theme.icon} />
          <TouchableOpacity
            onPress={handlerCreate}
            className={`px-5 py-2.5 rounded-full flex-row items-center ${
              note.trim().length > 0
                ? "bg-light-primary dark:bg-dark-primary"
                : "bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border"
            }`}
          >
            <Text
              className={`font-sans font-bold mr-1.5 ${
                note.trim().length > 0
                  ? "text-white"
                  : "text-light-icon dark:text-dark-icon"
              }`}
            >
              Actualizar
            </Text>
            <Ionicons
              name="send"
              size={14}
              color={note.trim().length > 0 ? "#fff" : theme.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
