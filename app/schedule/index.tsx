import { SCHEDULE } from "@/constants/vars";
import { getAllProjectByDayOfWeekAction } from "@/presentation/actions/get-all-project-by-day-of-week.action";
import { getNextSevenDays } from "@/utils/customDate";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Intl.DateTimeFormat("es-ES", { weekday: "short" }).format(new Date()),
  );
  const router = useRouter();

  const queryWeekDays = useQuery({
    queryKey: ["seven-days"],
    queryFn: () => getNextSevenDays(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const queryProject = useQuery({
    queryKey: [SCHEDULE, selectedDate],
    queryFn: () => getAllProjectByDayOfWeekAction(selectedDate),
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background pt-6">
      <View className="px-6 mb-6">
        <Text className="text-3xl font-bold font-sans text-light-text dark:text-dark-text">
          Tu Agenda 📅
        </Text>
        <Text className="text-light-icon dark:text-dark-icon font-sans mt-2">
          Organiza tu semana asignando tiempos a cada lenguaje y proyecto.
        </Text>
      </View>

      <View className="mb-8">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6"
        >
          {queryWeekDays.data?.map((day, index) => {
            const isSelected = selectedDate === day.dayName;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(day.dayName)}
                className={`w-16 items-center p-3 rounded-full mr-3 border border-transparent dark:border-dark-border ${
                  isSelected
                    ? "bg-light-primary dark:bg-dark-primary"
                    : "bg-light-surface dark:bg-dark-surface"
                }`}
              >
                <Text
                  className={`font-sans text-xs mb-1 ${
                    isSelected
                      ? "text-white font-semibold"
                      : "text-light-icon dark:text-dark-icon font-medium"
                  }`}
                >
                  {day.dayName}
                </Text>
                <Text
                  className={`font-mono font-bold text-lg ${
                    isSelected
                      ? "text-white"
                      : "text-light-text dark:text-dark-text"
                  }`}
                >
                  {day.dayNumber}
                </Text>
                {day.fullDate.getDate() === new Date().getDate() &&
                  !isSelected && (
                    <View className="w-1.5 h-1.5 rounded-full bg-light-primary dark:bg-dark-primary mt-1" />
                  )}
              </TouchableOpacity>
            );
          })}
          <View className="w-6" />
        </ScrollView>
      </View>

      <View className="flex-1 px-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-light-text dark:text-dark-text font-bold font-sans text-xl">
            Para Hoy
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="border-l-[1.5px] border-light-border dark:border-dark-border ml-2.5 pl-6 pb-20">
            {queryProject.isLoading ? (
              <View className="flex-row w-full justify-center">
                <Text className="dark:text-dark-text text-light-text">
                  Cargando...
                </Text>
              </View>
            ) : queryProject.data?.length === 0 ? (
              <View className="flex-row w-full justify-center">
                <Text className="dark:text-dark-text text-light-text">
                  No hay proyectos para hoy
                </Text>
              </View>
            ) : (
              queryProject.data?.map((item, index) => (
                <View key={index} className="mb-8 relative">
                  <View
                    className="absolute w-3 h-3 rounded-full -left-[30px] top-1.5 border-[2px] border-light-background dark:border-dark-background"
                    style={{ backgroundColor: item.language.color }}
                  />

                  <Text className="text-light-icon dark:text-dark-icon font-mono font-bold text-xs mb-2 tracking-wider">
                    {item.language.name}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      router.navigate({
                        pathname: "/details/[id]",
                        params: { id: item.id },
                      })
                    }
                    className="bg-light-surface dark:bg-dark-surface p-4 rounded-3xl shadow-sm border border-transparent dark:border-dark-border flex-row items-start"
                  >
                    <View
                      className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
                      style={{ backgroundColor: item.language.color + "20" }}
                    >
                      <Ionicons
                        name={item.language.icon as any}
                        size={24}
                        color={item.language.color}
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="font-mono text-[10px] uppercase font-bold tracking-widest mb-1"
                        style={{ color: item.language.color }}
                      >
                        {item.language.name}
                      </Text>
                      <Text className="text-light-text dark:text-dark-text font-bold font-sans text-lg mb-1 leading-tight">
                        {item.title}
                      </Text>
                      <Text className="text-light-icon dark:text-dark-icon font-sans text-sm">
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
