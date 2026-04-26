import { USER } from "@/constants/vars";
import { useColorScheme } from "@/hooks/use-color-scheme";
import getUserAction from "@/presentation/actions/get-user.action";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useQuery } from "@tanstack/react-query";
import { Image, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";

export function CustomDrawerContent(props: any) {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const query = useQuery({
    queryKey: [USER],
    queryFn: getUserAction,
  });

  return (
    <View className="flex-1 bg-light-surface dark:bg-dark-surface">
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View className="bg-light-primary dark:bg-dark-primary h-52 px-6 justify-between py-6 pb-8 rounded-br-[3rem]">
          <View className="flex-row items-center justify-end mt-2 opacity-70">
            <Ionicons
              name="terminal"
              size={14}
              color="#ffffff"
              className="mr-1.5"
            />
            <Text className="text-white font-bold text-xs font-sans tracking-widest uppercase">
              Tracker Estudio
            </Text>
          </View>

          <View>
            {!query.data?.photo ? (
              <Image
                source={{ uri: "https://i.pravatar.cc/150?u=dev" }}
                className="w-16 h-16 rounded-2xl border-2 border-white/20 mb-3"
              />
            ) : (
              <Image
                source={{ uri: query.data.photo }}
                className="w-16 h-16 rounded-2xl border-2 border-white/20 mb-3"
                resizeMode="cover"
              />
            )}
            <Text className="text-white font-bold text-xl font-sans">
              {query.data?.name}
            </Text>
            <Text className="text-white/80 font-medium text-sm mt-1 font-sans">
              {query.data?.lastName}
            </Text>
          </View>
        </View>

        <View className="pt-4 px-2">
          <DrawerItemList {...props} />

          <View className="h-[1px] bg-light-border dark:bg-dark-border mb-3 mt-1 mx-2" />

          <DrawerItem
            label={!query.data ? "Agrega tus datos" : "Actualizar tus datos"}
            icon={({ focused, size }) => (
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: themeColors.secondary + "15" }}
              >
                <Ionicons
                  name={focused ? "person-add" : "person-add-outline"}
                  size={20}
                  color={themeColors.secondary}
                />
              </View>
            )}
            inactiveTintColor={themeColors.icon}
            activeTintColor={themeColors.primary}
            labelStyle={props.labelStyle}
            onPress={() => props.navigation.navigate("auth/register/index")}
          />
          <View className="h-[1px] bg-light-border dark:bg-dark-border my-3 mx-2" />
          <DrawerItem
            label="Configuración"
            icon={({ focused, size }) => (
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: themeColors.icon + "15" }}
              >
                <Ionicons
                  name={focused ? "settings" : "settings-outline"}
                  size={20}
                  color={themeColors.icon}
                />
              </View>
            )}
            inactiveTintColor={themeColors.icon}
            activeTintColor={themeColors.primary}
            labelStyle={props.labelStyle}
            onPress={() => props.navigation.navigate("configuration/index")}
          />
        </View>
      </DrawerContentScrollView>

      <View className="p-6 border-t border-light-border dark:border-dark-border">
        <Text className="text-center text-light-icon dark:text-dark-icon text-xs font-mono uppercase tracking-widest">
          v1.0.0
        </Text>
        <Text className="text-center text-light-icon dark:text-dark-icon text-xs font-mono uppercase tracking-widest">
          Hecho con ❤️ por keiner-code
        </Text>
      </View>
    </View>
  );
}
