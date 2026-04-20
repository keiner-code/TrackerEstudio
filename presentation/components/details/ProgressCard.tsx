import { usePogressCardUpdate } from "@/presentation/hooks/useProgressCardUpdate";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface Props {
  progress: number;
  project_id: number;
}

export default function ProgressCard({ progress, project_id }: Props) {
  const { handlerUpdateProgress, theme } = usePogressCardUpdate({
    project_id,
    progress,
  });

  return (
    <View className="bg-light-surface dark:bg-dark-surface p-5 rounded-3xl shadow-sm border border-transparent dark:border-dark-border mt-2">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-light-text dark:text-dark-text font-bold font-sans text-lg mb-2">
          Progreso General
        </Text>
        <Text className="text-light-success dark:text-dark-success font-mono font-bold text-xl">
          {progress}%
        </Text>
      </View>
      <View className="h-2 w-full bg-light-background dark:bg-dark-background rounded-full overflow-hidden mb-4">
        <View
          className="h-full bg-light-success dark:bg-dark-success rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>
      <View className="flex-row gap-5">
        <Pressable
          onPress={() => handlerUpdateProgress("remove")}
          className="bg-light-surface dark:bg-dark-surface p-2 rounded-full border border-light-border dark:border-dark-border"
        >
          <Ionicons
            disabled={progress === 0}
            name="remove"
            size={24}
            color={theme.icon}
          />
        </Pressable>
        <Pressable
          onPress={() => handlerUpdateProgress("add")}
          className="bg-light-surface dark:bg-dark-surface p-2 rounded-full border border-light-border dark:border-dark-border"
        >
          <Ionicons
            disabled={progress === 100}
            name="add"
            size={24}
            color={theme.icon}
          />
        </Pressable>
      </View>
    </View>
  );
}
