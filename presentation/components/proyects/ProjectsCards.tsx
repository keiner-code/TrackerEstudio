import { PROJECT } from "@/constants/vars";
import getAllProyectsAction from "@/presentation/actions/get-all-proyect.action";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProjectsCards() {
  const projectQuery = useQuery({
    queryKey: [PROJECT],
    queryFn: getAllProyectsAction,
  });
  return (
    <>
      {projectQuery.data?.length === 0 ? (
        <View className="flex justify-center items-center">
          <Text className="text-slate-400">Agregue un proyecto</Text>
        </View>
      ) : projectQuery.isPending ? (
        <View className="flex justify-center items-center">
          <Text className="text-white">Cargando...</Text>
        </View>
      ) : (
        projectQuery.data!.map((project, index) => (
          <TouchableOpacity
            key={index}
            className="bg-light-surface dark:bg-dark-surface p-5 rounded-3xl mb-4 shadow-sm border border-transparent dark:border-dark-border"
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1 mr-4">
                <Text className="text-light-text dark:text-dark-text font-bold font-sans text-lg mb-1">
                  {project.title}
                </Text>
                <Text
                  style={{ color: project.language.color }}
                  className="font-sans text-xs font-semibold"
                >
                  {project.language.name}
                </Text>
              </View>
              <View className="bg-light-background dark:bg-dark-background px-3 py-1.5 rounded-full">
                <Text className="text-light-text dark:text-dark-text font-mono font-bold text-xs">
                  {project.progress}%
                </Text>
              </View>
            </View>

            <View className="mb-4">
              <View className="h-1.5 w-full bg-light-background dark:bg-dark-background rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor: project.language.color,
                  }}
                />
              </View>
            </View>

            <View className="bg-light-background dark:bg-dark-background p-3 rounded-2xl flex-row items-center mt-2">
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={16}
                color={project.language.color}
                className="mr-2"
              />
              <Text
                className="text-light-icon dark:text-dark-icon font-sans text-xs flex-1 ml-2"
                numberOfLines={1}
              >
                <Text className="font-semibold text-light-text dark:text-dark-text">
                  Último avance:{" "}
                </Text>
                {project.comments.length === 0
                  ? "Sin comentarios"
                  : project.comments[0].content}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </>
  );
}
