import { Ionicons } from "@expo/vector-icons";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "../../../constants/colors";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-light-background dark:bg-dark-background"
    >
      {/* Fondo Superior Llamativo */}
      <View className="absolute top-0 w-full h-[320px] bg-light-primary dark:bg-dark-primary rounded-b-[4rem] pt-20 px-6 items-center">
         <View className="w-20 h-20 rounded-3xl bg-white/20 items-center justify-center mb-4 border border-white/20">
            <Ionicons name="terminal" size={40} color="#ffffff" />
         </View>
         <Text className="text-4xl font-bold font-sans text-white mb-2">
            Bienvenido 🚀
         </Text>
         <Text className="text-white/80 font-sans text-base text-center px-4 font-medium">
            Inicia sesión para continuar con tu progreso.
         </Text>
      </View>

      <ScrollView 
        className="flex-1 z-10" 
        contentContainerStyle={{ paddingTop: 260, paddingBottom: 40, paddingHorizontal: 24, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta del Formulario (Overlap sobre el header) */}
        <View className="bg-light-surface dark:bg-dark-surface p-6 px-5 rounded-[2.5rem] shadow-sm border border-transparent dark:border-dark-border mb-8">
          
          <View className="space-y-4 mb-2">
            <View>
              <Text className="text-light-text dark:text-dark-text font-bold font-sans text-sm mb-2 ml-2">
                Correo Electrónico
              </Text>
              <View className="flex-row items-center bg-light-background dark:bg-dark-background px-4 py-3.5 rounded-2xl border border-transparent dark:border-dark-border">
                <Ionicons name="mail-outline" size={20} color={theme.icon} className="mr-3" />
                <TextInput
                  className="flex-1 text-light-text dark:text-dark-text font-sans text-base pt-0 pb-0"
                  placeholder="alex@developer.com"
                  placeholderTextColor={theme.icon}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View className="mt-5">
              <Text className="text-light-text dark:text-dark-text font-bold font-sans text-sm mb-2 ml-2">
                Contraseña
              </Text>
              <View className="flex-row items-center bg-light-background dark:bg-dark-background px-4 py-3.5 rounded-2xl border border-transparent dark:border-dark-border">
                <Ionicons name="lock-closed-outline" size={20} color={theme.icon} className="mr-3" />
                <TextInput
                  className="flex-1 text-light-text dark:text-dark-text font-sans text-base pt-0 pb-0"
                  placeholder="••••••••"
                  placeholderTextColor={theme.icon}
                  secureTextEntry
                />
                <TouchableOpacity>
                  <Ionicons name="eye-off-outline" size={20} color={theme.icon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="items-end mt-4 mb-2 mr-1">
                <Text className="text-light-primary dark:text-dark-primary font-sans font-bold text-sm">
                  ¿Olvidaste tu contraseña?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Botón Ingresar */}
          <TouchableOpacity 
            className="bg-light-primary dark:bg-dark-primary py-4 rounded-xl shadow-sm items-center mt-2"
            onPress={() => router.replace("/(home)")}
          >
            <Text className="text-white font-bold font-sans text-[17px]">
              Ingresar
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center mt-2">
          <Text className="text-light-text dark:text-dark-text font-sans text-[15px]">
            ¿No tienes una cuenta? 
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text className="text-light-primary dark:text-dark-primary font-sans font-bold text-[15px] ml-1.5">
              Regístrate
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
