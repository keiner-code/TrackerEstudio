import { LANGUAGES } from "@/constants/vars";
import getAllLanguageAction from "@/presentation/actions/get-all-language.action";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function LanguageCards() {
  const languageQuery = useQuery({
    queryKey: [LANGUAGES],
    queryFn: getAllLanguageAction,
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="-mx-6 px-6"
    >
      {languageQuery.data?.length === 0 ? (
        <View className="flex justify-center items-center">
          <Text className="text-slate-400">
            Agregue un lenguaje de programacion
          </Text>
        </View>
      ) : languageQuery.isPending ? (
        <View className="flex justify-center items-center">
          <Text className="text-white">Cargando...</Text>
        </View>
      ) : (
        languageQuery.data!.map((lang, index) => (
          <TouchableOpacity
            key={index}
            className="bg-light-surface dark:bg-dark-surface p-5 rounded-3xl mr-4 w-40 shadow-sm border border-transparent dark:border-dark-border"
          >
            <View className="w-12 h-12 bg-light-background dark:bg-dark-background rounded-2xl items-center justify-center mb-4">
              <Ionicons name={lang.icon as any} size={24} color={lang.color} />
            </View>
            <Text className="text-light-text dark:text-dark-text font-bold font-sans text-lg mb-1">
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))
      )}
      <View className="w-6" />
    </ScrollView>
  );
}
