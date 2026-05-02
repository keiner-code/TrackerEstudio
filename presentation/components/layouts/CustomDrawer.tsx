import { Colors } from "@/constants/colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import Drawer from "expo-router/drawer";
import { View } from "react-native";
import { CustomDrawerContent } from "./CustomDrawerContent";

export default function CustomDrawer() {
  const themeColors = useColorScheme() === "dark" ? Colors.dark : Colors.light;

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: themeColors.border,
        },
        headerTintColor: themeColors.text,
        headerTitleStyle: {
          fontFamily: "Inter_600SemiBold",
          fontSize: 18,
        },
        drawerStyle: {
          width: 280,
          backgroundColor: "transparent",
        },
        drawerActiveTintColor: themeColors.primary,
        drawerInactiveTintColor: themeColors.icon,
        drawerActiveBackgroundColor: themeColors.primary + "1A",
        drawerLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 15,
          marginLeft: -10,
        },
      }}
    >
      <Drawer.Screen
        name="(home)/index"
        options={{
          title: " Resumen Diario",
          drawerIcon: ({ focused, size }) => (
            <View
              className="w-9 h-9 rounded-xl items-center justify-center"
              style={{ backgroundColor: themeColors.primary + "15" }}
            >
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={20}
                color={themeColors.primary}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="proyects/index"
        options={{
          title: " Proyectos y Lenguajes",
          drawerIcon: ({ focused, size }) => (
            <View
              className="w-9 h-9 rounded-xl items-center justify-center"
              style={{ backgroundColor: themeColors.secondary + "15" }}
            >
              <Ionicons
                name={focused ? "folder-open" : "folder-open-outline"}
                size={20}
                color={themeColors.secondary}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="schedule/index"
        options={{
          title: " Cronograma",
          drawerIcon: ({ focused, size }) => (
            <View
              className="w-9 h-9 rounded-xl items-center justify-center"
              style={{ backgroundColor: themeColors.success + "15" }}
            >
              <Ionicons
                name={focused ? "calendar" : "calendar-outline"}
                size={20}
                color={themeColors.success}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="details/[id]"
        options={{
          title: " Detalles",
          drawerIcon: ({ focused, size }) => (
            <View
              className="w-9 h-9 rounded-xl items-center justify-center"
              style={{ backgroundColor: themeColors.icon + "15" }}
            >
              <Ionicons
                name={
                  focused ? "information-circle" : "information-circle-outline"
                }
                size={22}
                color={themeColors.icon}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="configuration/index"
        options={{
          title: " Configuración",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="auth/register/index"
        options={{
          title: " Agrega tus datos",
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
