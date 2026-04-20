import { useHomeScreen } from "@/presentation/hooks/useHomeScreen";
import { formatHour } from "@/utils/formatHour";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { currentDate, queryProject, theme, customHourShow, queryComments } =
    useHomeScreen();

  return (
    <ScrollView
      className="flex-1 bg-light-background dark:bg-dark-background px-6 pt-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8">
        <Text className="text-light-icon dark:text-dark-icon font-medium font-sans uppercase tracking-widest text-xs mb-1">
          {currentDate}
        </Text>
        <Text className="text-3xl font-bold font-sans text-light-text dark:text-dark-text">
          Hola, Developer 👋
        </Text>
      </View>

      {queryProject.isLoading ? (
        <View className="flex-1 justify-center items-center py-20 mt-10">
          <View className="w-24 h-24 bg-light-surface dark:bg-dark-surface rounded-[32px] items-center justify-center shadow-sm border border-transparent dark:border-dark-border mb-6">
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
          <Text className="text-2xl font-bold font-sans text-light-text dark:text-dark-text mb-3 text-center">
            Preparando tu entorno...
          </Text>
          <Text className="text-light-icon dark:text-dark-icon font-sans text-base text-center px-10">
            Estamos cargando tu progreso y organizando tu espacio de trabajo.
          </Text>
        </View>
      ) : queryProject.isError ? (
        <View className="flex-1 justify-center items-center ">
          <Text className="text-3xl font-bold font-sans text-light-text dark:text-dark-text">
            Error al cargar el proyecto
          </Text>
        </View>
      ) : !queryProject.data || queryProject.data.length === 0 ? (
        <View className="flex-1 justify-center items-center ">
          <Text className="text-3xl font-bold font-sans text-light-text dark:text-dark-text">
            No hay proyecto para mostrar
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{ backgroundColor: queryProject.data![0].language.color }}
            className="p-6 rounded-3xl mb-6 shadow-sm"
          >
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-white/80 font-medium font-sans text-sm mb-1">
                  Enfoque Actual {queryProject.data![0].id}
                </Text>
                <Text className="text-white font-bold font-sans text-2xl">
                  {queryProject.data![0].language.name}
                </Text>
              </View>
              <View className="w-14 h-14 bg-white/40 rounded-2xl items-center justify-center">
                <Ionicons
                  name={queryProject.data![0].language.icon as any}
                  size={28}
                  color={queryProject.data![0].language.color}
                />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-white font-medium font-mono text-xs uppercase tracking-widest">
                  Progreso
                </Text>
                <Text className="text-white font-bold font-mono text-xs">
                  {queryProject.data![0].progress}%
                </Text>
              </View>
              <View className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                <View
                  className="h-full bg-light-success dark:bg-dark-success rounded-full"
                  style={{ width: `${queryProject.data![0].progress}%` }}
                />
              </View>
            </View>
          </View>

          <View className="flex-row justify-between mb-8">
            <View className="bg-light-surface dark:bg-dark-surface p-5 rounded-3xl w-[48%] shadow-sm border border-transparent dark:border-dark-border">
              <View className="w-12 h-12 bg-light-background dark:bg-dark-background rounded-2xl items-center justify-center mb-3">
                <Ionicons name="time-outline" size={24} color={theme.primary} />
              </View>
              <Text className="text-light-icon dark:text-dark-icon font-sans text-xs mb-1 font-medium">
                Tiempo Hoy
              </Text>
              <Text className="text-light-text dark:text-dark-text font-bold font-mono text-xl">
                {customHourShow()}
              </Text>
            </View>

            <View className="bg-light-surface dark:bg-dark-surface p-5 rounded-3xl w-[48%] shadow-sm border border-transparent dark:border-dark-border">
              <View className="w-12 h-12 bg-light-background dark:bg-dark-background rounded-2xl items-center justify-center mb-3">
                <Ionicons
                  name="flame-outline"
                  size={24}
                  color={theme.secondary}
                />
              </View>
              <Text className="text-light-icon dark:text-dark-icon font-sans text-xs mb-1 font-medium">
                Tiempo total
              </Text>
              <Text className="text-light-text dark:text-dark-text font-bold font-mono text-xl">
                {formatHour(queryProject.data[0].total_hours)}
              </Text>
            </View>
          </View>

          <View className="mb-8">
            <Text className="text-light-text dark:text-dark-text font-bold font-sans text-xl mb-4">
              Actividad Reciente
            </Text>

            {queryComments.isLoading ? (
              <View className="flex-row items-center justify-center py-8 bg-light-surface dark:bg-dark-surface rounded-3xl border border-transparent dark:border-dark-border">
                <ActivityIndicator size="small" color={theme.primary} />
                <Text className="text-light-icon dark:text-dark-icon font-sans text-sm ml-3">
                  Cargando comentarios...
                </Text>
              </View>
            ) : queryComments.isError ? (
              <Text className="text-red-500 font-sans text-sm">
                Error al cargar comentarios.
              </Text>
            ) : queryComments.data && queryComments.data.length > 0 ? (
              queryComments.data.map((item, index) => (
                <TouchableOpacity
                  key={item.id || index}
                  className="flex-row items-center bg-light-surface dark:bg-dark-surface p-4 rounded-2xl mb-3 shadow-sm border border-transparent dark:border-dark-border"
                >
                  <View className="w-12 h-12 bg-light-background dark:bg-dark-background rounded-xl items-center justify-center mr-4">
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={20}
                      color={theme.icon}
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      className="text-light-text dark:text-dark-text font-semibold font-sans text-base"
                      numberOfLines={1}
                    >
                      Comentario
                    </Text>
                    <Text
                      className="text-light-icon dark:text-dark-icon font-sans text-xs mt-0.5"
                      numberOfLines={1}
                    >
                      {item.content}
                    </Text>
                  </View>
                  <View className="items-end pl-2 max-w-[90px]">
                    <Text
                      className="text-light-icon dark:text-dark-icon font-sans text-xs mb-1 text-right"
                      numberOfLines={2}
                    >
                      {new Date(item.created_at).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      {new Date(item.created_at).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-light-icon dark:text-dark-icon font-sans text-sm">
                No hay actividad reciente.
              </Text>
            )}
          </View>

          <View className="h-10" />
        </>
      )}
    </ScrollView>
  );
}
