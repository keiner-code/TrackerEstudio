import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

export default function ConfigurationScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [notifications, setNotifications] = useState(true);
  const [dataSync, setDataSync] = useState(false);

  //!Notifications
  /* async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Youve got mail",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
        sound: "notification.wav",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  } */

  //!

  const SettingRow = ({
    icon,
    title,
    subtitle,
    type = "link",
    value,
    onValueChange,
    isDestructive = false,
  }: any) => (
    <TouchableOpacity
      disabled={type === "toggle"} // Deshabilita el touch de la fila si hay un switch adentro para no crear doble acción
      className="flex-row items-center justify-between py-4"
    >
      <View className="flex-row items-center flex-1 pr-4">
        <View
          className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${isDestructive ? "bg-red-500/10" : "bg-light-background dark:bg-dark-background"}`}
        >
          <Ionicons
            name={icon}
            size={20}
            color={isDestructive ? "#ef4444" : theme.icon}
          />
        </View>
        <View className="flex-1">
          <Text
            className={`font-sans font-bold text-[15px] ${isDestructive ? "text-red-500" : "text-light-text dark:text-dark-text"}`}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className="font-sans text-sm text-light-icon dark:text-dark-icon mt-0.5">
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {type === "link" && (
        <Ionicons name="chevron-forward" size={20} color={theme.icon} />
      )}
      {type === "toggle" && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: theme.border, true: theme.primary }}
          thumbColor={
            Platform.OS === "ios" ? "#ffffff" : value ? "#ffffff" : "#f4f3f4"
          }
        />
      )}
    </TouchableOpacity>
  );

  const handlerNotification = () => {
    setNotifications(!notifications);
  };

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background pt-8 px-6">
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-light-surface dark:bg-dark-surface rounded-full items-center justify-center mr-4 border border-light-border dark:border-dark-border shadow-sm"
        >
          <Ionicons name="arrow-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text className="text-3xl font-bold font-sans text-light-text dark:text-dark-text">
          Ajustes
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <View className="bg-light-primary dark:bg-dark-primary rounded-[2rem] p-6 mb-8 flex-row items-center shadow-sm">
          <View className="w-16 h-16 rounded-full bg-white/20 items-center justify-center mr-4 border border-white/40">
            <Ionicons name="person" size={28} color="#ffffff" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold font-sans text-xl">
              Alex Developer
            </Text>
            <Text className="text-white/80 font-sans text-sm mt-0.5">
              Plan Gratuito 🚀
            </Text>
          </View>
          <TouchableOpacity className="bg-white/20 px-4 py-2.5 rounded-2xl ml-2">
            <Text className="text-white font-bold font-sans text-xs uppercase tracking-widest">
              PRO
            </Text>
          </TouchableOpacity>
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
            onValueChange={handlerNotification}
          />
          <View className="h-[1px] bg-light-border dark:bg-dark-border ml-16" />
          <SettingRow
            icon="language-outline"
            title="Idioma Principal"
            subtitle="Español (Latinoamérica)"
            type="link"
          />
        </View>

        <Text className="text-light-icon dark:text-dark-icon font-mono font-bold text-[11px] uppercase tracking-widest mb-3 ml-3">
          Datos e Integración
        </Text>
        <View className="bg-light-surface dark:bg-dark-surface rounded-[2rem] px-5 py-2 mb-8 shadow-sm border border-transparent dark:border-dark-border">
          <SettingRow
            icon="cloud-upload-outline"
            title="Sincronización en la Nube"
            subtitle="Tus proyectos en todos tus dispositivos"
            type="toggle"
            value={dataSync}
            onValueChange={setDataSync}
          />
          <View className="h-[1px] bg-light-border dark:bg-dark-border ml-16" />
          <SettingRow
            icon="logo-github"
            title="Conectar GitHub"
            subtitle="Importar lenguajes automáticamente"
            type="link"
          />
          <View className="h-[1px] bg-light-border dark:bg-dark-border ml-16" />
          <SettingRow
            icon="download-outline"
            title="Exportar Avances"
            subtitle="Descargar PDF de tus horas estudiadas"
            type="link"
          />
        </View>

        <Text className="text-light-icon dark:text-dark-icon font-mono font-bold text-[11px] uppercase tracking-widest mb-3 ml-3">
          Comunidad y Más
        </Text>
        <View className="bg-light-surface dark:bg-dark-surface rounded-[2rem] px-5 py-2 mb-8 shadow-sm border border-transparent dark:border-dark-border">
          <SettingRow
            icon="star-outline"
            title="Calificar en App Store"
            type="link"
          />
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

        <View className="bg-light-surface dark:bg-dark-surface rounded-[2rem] px-5 py-2 mb-8 shadow-sm border border-red-500/20">
          <SettingRow
            icon="trash-outline"
            title="Borrar todos los datos"
            subtitle="Elimina proyectos y lenguajes locales. Esta acción no se puede revertir."
            type="link"
            isDestructive={true}
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
