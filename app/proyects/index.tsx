import { THEME } from "@/constants/vars";
import { useColorScheme } from "@/hooks/use-color-scheme";
import LanguageCards from "@/presentation/components/proyects/LanguageCards";
import ModalCreateLanguaje from "@/presentation/components/proyects/ModalCreateLanguaje";
import ModalCreateProject from "@/presentation/components/proyects/ModalCreateProject";
import ProjectsCards from "@/presentation/components/proyects/ProjectsCards";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProyectsScreen() {
  const colorScheme = useColorScheme();
  const theme = THEME(colorScheme);

  const [isModalProjectVisible, setisModalCreateVisible] = useState(false);
  const [isModalLenguajeVisible, setisModalLenguajeVisible] = useState(false);

  return (
    <ScrollView
      className="flex-1 bg-light-background dark:bg-dark-background px-6 pt-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6">
        <Text className="text-3xl font-bold font-sans text-light-text dark:text-dark-text">
          Tus Estudios 🚀
        </Text>
        <Text className="text-light-icon dark:text-dark-icon font-sans mt-2">
          Gestiona los lenguajes que dominas y los proyectos en los que estás
          trabajando actualmente.
        </Text>
      </View>

      <View className="mb-8">
        <View className="flex-row justify-between items-end mb-4">
          <Text className="text-light-text dark:text-dark-text font-bold font-sans text-xl">
            Lenguajes
          </Text>
          <TouchableOpacity onPress={() => setisModalLenguajeVisible(true)}>
            <Ionicons name="add-circle" size={32} color={theme.secondary} />
          </TouchableOpacity>
        </View>
        <LanguageCards />
      </View>

      <View className="mb-8">
        <View className="flex-row justify-between items-end mb-4">
          <Text className="text-light-text dark:text-dark-text font-bold font-sans text-xl">
            Proyectos Activos
          </Text>
          <TouchableOpacity onPress={() => setisModalCreateVisible(true)}>
            <Ionicons name="add-circle" size={32} color={theme.primary} />
          </TouchableOpacity>
        </View>
        <ProjectsCards />
      </View>

      <View className="h-20" />

      <ModalCreateLanguaje
        isModalVisible={isModalLenguajeVisible}
        setModalVisible={setisModalLenguajeVisible}
      />
      <ModalCreateProject
        isModalVisible={isModalProjectVisible}
        setModalVisible={setisModalCreateVisible}
      />
    </ScrollView>
  );
}
