import { Ionicons } from "@expo/vector-icons";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "../../../constants/colors";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-light-background dark:bg-dark-background"
    >
      {/* Fondo Superior Llamativo */}
      <View className="absolute top-0 w-full h-[280px] bg-light-primary dark:bg-dark-primary rounded-b-[4rem] px-6 pt-12 items-center z-0">
         <View className="w-full flex-row justify-start mb-0">
           <TouchableOpacity 
             onPress={() => router.back()} 
             className="w-10 h-10 bg-white/20 rounded-full items-center justify-center border border-white/20"
           >
              <Ionicons name="arrow-back" size={20} color="#ffffff" />
           </TouchableOpacity>
         </View>
         
         <View className="w-16 h-16 rounded-3xl bg-white/20 items-center justify-center mb-3 border border-white/20">
            <Ionicons name="person-add" size={30} color="#ffffff" />
         </View>
         
         <Text className="text-3xl font-bold font-sans text-white mb-1">
            Crear Cuenta
         </Text>
         <Text className="text-white/80 font-sans text-sm font-medium text-center px-4">
            Comienza a trackear tu aprendizaje hoy y lleva tu progreso al siguiente nivel.
         </Text>
      </View>

      <ScrollView 
        className="flex-1 z-10" 
        contentContainerStyle={{ paddingTop: 240, paddingBottom: 40, paddingHorizontal: 24, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tarjeta del Formulario (Overlap sobre el header) */}
        <View className="bg-light-surface dark:bg-dark-surface p-6 px-5 rounded-[2.5rem] shadow-sm border border-transparent dark:border-dark-border mb-8">
          
          <View className="space-y-4 mb-2">
            <View className="mb-4">
              <Text className="text-light-text dark:text-dark-text font-bold font-sans text-sm mb-2 ml-2">
                Nombre Completo
              </Text>
              <View className="flex-row items-center bg-light-background dark:bg-dark-background px-4 py-3.5 rounded-2xl border border-transparent dark:border-dark-border">
                <Ionicons name="person-outline" size={20} color={theme.icon} className="mr-3" />
                <TextInput
                  className="flex-1 text-light-text dark:text-dark-text font-sans text-base pt-0 pb-0"
                  placeholder="Alex Developer"
                  placeholderTextColor={theme.icon}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View className="mb-4">
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

            <View className="mb-4">
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
              </View>
            </View>
          </View>

          {/* Botón Registrarse */}
          <TouchableOpacity 
            className="bg-light-primary dark:bg-dark-primary py-4 rounded-xl shadow-sm items-center mt-4"
            onPress={() => router.replace("/(home)")}
          >
            <Text className="text-white font-bold font-sans text-[17px]">
              Comenzar ahora
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center pb-6">
          <Text className="text-light-text dark:text-dark-text font-sans text-[15px]">
            ¿Ya tienes una cuenta? 
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text className="text-light-primary dark:text-dark-primary font-sans font-bold text-[15px] ml-1.5">
              Inicia Sesión
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
