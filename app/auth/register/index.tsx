import { useToggleUserScreen } from "@/presentation/hooks/useToggleUserScreen";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRef } from "react";

import { Image } from "expo-image";
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const headerHeight = useHeaderHeight();
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    currentError,
    pickImage,
    photoUri,
    theme,
    current,
    setCurrent,
    handlerToggle,
    queryUser,
  } = useToggleUserScreen();
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
      className="flex-1 bg-light-background dark:bg-dark-background"
    >
      {(currentError.error_name !== "" ||
        currentError.error_lastName !== "" ||
        currentError.error_age !== "") && (
        <View className="absolute bottom-12 left-6 right-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 p-4 rounded-2xl shadow-sm z-50 flex-row items-center">
          <View className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-full items-center justify-center mr-3">
            <Ionicons name="alert-circle" size={24} color="#ef4444" />
          </View>
          <View className="flex-1">
            <Text className="text-red-800 dark:text-red-300 font-bold font-sans text-base mb-0.5">
              ¡Ups! Faltan datos
            </Text>
            <Text className="text-red-600 dark:text-red-400 font-sans text-[13px]">
              {currentError.error_name ||
                currentError.error_lastName ||
                currentError.error_age}
            </Text>
          </View>
        </View>
      )}

      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
      >
        <View className="w-full h-[280px] bg-light-primary dark:bg-dark-primary rounded-b-[4rem] px-6 pt-12 items-center">
          <TouchableOpacity
            onPress={pickImage}
            className="w-20 h-20 rounded-full bg-white/20 items-center justify-center mb-3 border border-white/40 overflow-hidden shadow-sm z-50"
          >
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                style={{ width: '100%', height: '100%' }}
                contentFit="cover"
              />
            ) : (
              <Ionicons name="camera" size={32} color="#ffffff" />
            )}
          </TouchableOpacity>

          <Text className="text-3xl font-bold font-sans text-white mb-1">
            {!queryUser.data ? "Agrega tus datos" : "Bienvenido"}
          </Text>
          <Text className="text-white/80 font-sans text-sm font-medium text-center px-4">
            Comienza a trackear tu aprendizaje hoy y lleva tu progreso al
            siguiente nivel.
          </Text>
        </View>

        <View className="bg-light-surface dark:bg-dark-surface p-6 px-5 rounded-[2.5rem] shadow-sm border border-transparent dark:border-dark-border mb-8 mx-6 -mt-10">
          <View className="space-y-4 mb-2">
            <View className="mb-4">
              <Text className="text-light-text mt-2 dark:text-dark-text font-bold font-sans text-sm mb-2 ml-2">
                Nombre
              </Text>
              <View
                className={`flex-row items-center bg-light-background dark:bg-dark-background px-4 py-3.5 rounded-2xl border ${
                  currentError.error_name !== ""
                    ? "border-red-500"
                    : "border-transparent dark:border-dark-border"
                }`}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={theme.icon}
                  className="mr-3"
                />
                <TextInput
                  value={current.name}
                  onFocus={() => {
                    setTimeout(
                      () =>
                        scrollViewRef.current?.scrollToEnd({ animated: true }),
                      150,
                    );
                  }}
                  onChangeText={(value) =>
                    setCurrent({ ...current, name: value })
                  }
                  className="flex-1 text-light-text dark:text-dark-text font-sans text-base pt-0 pb-0"
                  placeholder="Alex Developer"
                  placeholderTextColor={theme.icon}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-light-text dark:text-dark-text font-bold font-sans text-sm mb-2 ml-2">
                Apellido
              </Text>
              <View
                className={`flex-row items-center bg-light-background dark:bg-dark-background px-4 py-3.5 rounded-2xl border ${
                  currentError.error_lastName !== ""
                    ? "border-red-500"
                    : "border-transparent dark:border-dark-border"
                }`}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={theme.icon}
                  className="mr-3"
                />
                <TextInput
                  className="flex-1 text-light-text dark:text-dark-text font-sans text-base pt-0 pb-0"
                  placeholder="Rua Fontalvo"
                  placeholderTextColor={theme.icon}
                  keyboardType="default"
                  autoCapitalize="none"
                  onFocus={() => {
                    setTimeout(
                      () =>
                        scrollViewRef.current?.scrollToEnd({ animated: true }),
                      150,
                    );
                  }}
                  value={current.lastName}
                  onChangeText={(value) =>
                    setCurrent({ ...current, lastName: value })
                  }
                />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-light-text dark:text-dark-text font-bold font-sans text-sm mb-2 ml-2">
                Edad
              </Text>
              <View
                className={`flex-row items-center bg-light-background dark:bg-dark-background px-4 py-3.5 rounded-2xl border ${
                  currentError.error_age !== ""
                    ? "border-red-500"
                    : "border-transparent dark:border-dark-border"
                }`}
              >
                <Ionicons
                  name="arrow-down-left-box-outline"
                  size={20}
                  color={theme.icon}
                  className="mr-3"
                />
                <TextInput
                  className="flex-1 text-light-text dark:text-dark-text font-sans text-base pt-0 pb-0"
                  placeholder="32"
                  value={current.age}
                  placeholderTextColor={theme.icon}
                  inputMode="numeric"
                  keyboardType="numeric"
                  onFocus={() => {
                    setTimeout(
                      () =>
                        scrollViewRef.current?.scrollToEnd({ animated: true }),
                      150,
                    );
                  }}
                  onChangeText={(value) =>
                    setCurrent({ ...current, age: value })
                  }
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="bg-light-primary dark:bg-dark-primary py-4 rounded-xl shadow-sm items-center mt-4"
            onPress={() => handlerToggle()}
          >
            <Text className="text-white font-bold font-sans text-[17px]">
              {!queryUser.data ? "Comenzar ahora" : "Actualizar ahora"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
