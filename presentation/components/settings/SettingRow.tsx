import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {
    Platform,
    Switch,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

interface Props {
  icon: any;
  title: string;
  subtitle?: string;
  type: string;
  value?: boolean;
  onValueChange?: ((value: boolean) => void | Promise<void>) | null | undefined;
  isDestructive?: boolean;
}

export default function SettingRow({
  icon,
  title,
  subtitle,
  type = "link",
  value,
  onValueChange,
  isDestructive = false,
}: Props) {
  const theme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  return (
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
}
