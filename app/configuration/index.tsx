import { useColorScheme } from "@/hooks/use-color-scheme";
import SettingRow from "@/presentation/components/settings/SettingRow";
import { useToggleUserScreen } from "@/presentation/hooks/useToggleUserScreen";
import { useSettingsStore } from "@/store/settingsStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  Appearance,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

export default function ConfigurationScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  const { queryUser } = useToggleUserScreen();

  const isDarkMode = useSettingsStore((s) => s.isDarkMode);
  const setIsDarkMode = useSettingsStore((s) => s.setDarkMode);
  const notifications = useSettingsStore((s) => s.isActiveNotification);
  const setNotifications = useSettingsStore((s) => s.setActiveNotification);

  useEffect(() => {
    if (!isDarkMode) {
      Appearance.setColorScheme("light");
      return;
    }
    Appearance.setColorScheme("dark");
  }, [isDarkMode]);

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background pt-8 px-6">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <TouchableOpacity
          onPress={() => router.push("/auth/register")}
          activeOpacity={0.8}
          className="bg-light-primary dark:bg-dark-primary rounded-[2rem] p-6 mb-8 flex-row items-center shadow-sm"
        >
          <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center mr-4 border border-white/40 overflow-hidden">
            {queryUser.data?.photo ? (
              <Image
                source={{ uri: queryUser.data.photo }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            ) : (
              <Ionicons name="person" size={28} color="#ffffff" />
            )}
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold font-sans text-xl">
              {queryUser.isPending
                ? "Cargando..."
                : queryUser.data
                  ? `${queryUser.data.name} ${queryUser.data.lastName}`
                  : "Registra tu perfil"}
            </Text>
            <Text className="text-white/80 font-sans text-sm mt-0.5">
              Presiona para configurar
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/auth/register")}
            className="bg-white/20 px-4 py-2.5 rounded-2xl ml-2"
          >
            <Text className="text-white font-bold font-sans text-xs uppercase tracking-widest">
              {queryUser.data ? "EDIT" : "PRO"}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <View>
          <Text className="text-red-500 mb-4">Vista sin terminar</Text>
        </View>

        <Text className="text-light-icon dark:text-dark-icon font-mono font-bold text-[11px] uppercase tracking-widest mb-3 ml-3">
          Preferencias de la App
        </Text>
        <View className="bg-light-surface dark:bg-dark-surface rounded-[2rem] px-5 py-2 mb-8 shadow-sm border border-transparent dark:border-dark-border">
          <SettingRow
            icon="moon-outline"
            title="Apariencia / Tema"
            subtitle="Modo oscuro (Atado al sistema)"
            type="toggle"
            value={isDarkMode}
            onValueChange={setIsDarkMode}
          />
          <View className="h-[1px] bg-light-border dark:bg-dark-border ml-16" />
          <SettingRow
            icon="notifications-outline"
            title="Recordatorios Diarios"
            subtitle="Recibir alertas para estudiar"
            type="toggle"
            value={notifications}
            onValueChange={() => setNotifications(!notifications)}
          />
          <View className="h-[1px] bg-light-border dark:bg-dark-border ml-16" />
        </View>

        <Text className="text-light-icon dark:text-dark-icon font-mono font-bold text-[11px] uppercase tracking-widest mb-3 ml-3">
          Datos e Integración
        </Text>
        <View className="bg-light-surface dark:bg-dark-surface rounded-[2rem] px-5 py-2 mb-8 shadow-sm border border-transparent dark:border-dark-border">
          <SettingRow
            icon="cloud-upload-outline"
            title="Sincronización en la Nube"
            subtitle="Hacer un Backup"
            type="toggle"
            //value={}
            //onValueChange={}
          />
          <View className="h-[1px] bg-light-border dark:bg-dark-border ml-16" />
          <SettingRow
            icon="logo-github"
            title="Conectar GitHub"
            subtitle="Importar proyectos automáticamente"
            type="link"
          />
          <View className="h-[1px] bg-light-border dark:bg-dark-border ml-16" />
          <SettingRow
            icon="download-outline"
            title="Exportar Avances"
            subtitle="Descargar PDF de tus proyectos"
            type="link"
          />
        </View>

        <Text className="text-light-icon dark:text-dark-icon font-mono font-bold text-[11px] uppercase tracking-widest mb-3 ml-3">
          Comunidad y Más
        </Text>
        <View className="bg-light-surface dark:bg-dark-surface rounded-[2rem] px-5 py-2 mb-8 shadow-sm border border-transparent dark:border-dark-border">
          <View className="h-[1px] bg-light-border dark:bg-dark-border ml-16" />
          <SettingRow
            icon="chatbubbles-outline"
            title="Soporte y Ayuda"
            type="link"
          />
          <View className="h-[1px] bg-light-border dark:bg-dark-border ml-16" />
          <SettingRow
            icon="information-circle-outline"
            title="Acerca de"
            subtitle="Versión 1.0.0 (Build 42)"
            type="link"
          />
        </View>
        <View className="items-center pb-8 pt-2">
          <Ionicons
            name="terminal"
            size={24}
            color={theme.icon}
            className="opacity-40 mb-2"
          />
          <Text className="text-light-icon dark:text-dark-icon font-mono font-bold text-[11px] tracking-widest uppercase mb-1">
            Tracker Estudio
          </Text>
          <Text className="text-light-icon dark:text-dark-icon font-sans text-[11px] opacity-80">
            Hecho con ❤️ para Desarrolladores
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
