import { USER } from "@/constants/vars";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { CreateUser, User } from "@/interfaces";
import { createUserAction } from "@/presentation/actions/create-user.action";
import getUserAction from "@/presentation/actions/get-user.action";
import { updateUserAction } from "@/presentation/actions/update-user.action";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/colors";

type TypeInputs = {
  name: string;
  lastName: string;
  age: string;
};

type TypeInputsError = {
  error_name: string;
  error_lastName: string;
  error_age: string;
};

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [current, setCurrent] = useState<TypeInputs>({
    age: "",
    lastName: "",
    name: "",
  });
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [currentError, setCurrentError] = useState<TypeInputsError>({
    error_age: "",
    error_lastName: "",
    error_name: "",
  });

  const queryUser = useQuery({
    queryKey: [USER],
    queryFn: getUserAction,
    select(data) {
      if (data !== null) {
        setCurrent({
          name: data.name,
          lastName: data.lastName,
          age: data.age,
        });
      }
      return data;
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const validationInput = (): boolean => {
    if (current.name === "") {
      setCurrentError({
        ...currentError,
        error_name: "Por favor escriba un nombre",
      });
      return false;
    }

    if (current.lastName === "") {
      setCurrentError({
        ...currentError,
        error_lastName: "Por favor escriba el apellido",
      });
      return false;
    }

    if (current.age === "") {
      setCurrentError({
        ...currentError,
        error_age: "Por favor escriba la edad",
      });
      return false;
    }
    if (Number.isNaN(current.age)) {
      setCurrentError({
        ...currentError,
        error_age: "Por favor escriba una edad correcta",
      });
      return false;
    }
    return true;
  };

  const createUserMutation = useMutation({
    mutationFn: (user: CreateUser) =>
      createUserAction(user.name, user.lastName, user.age, user.photo),
    onSuccess() {
      router.navigate("/(home)");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (user: User) => updateUserAction(user),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [USER] });
      Alert.alert("¡Éxito!", "Usuario Actualizado");
    },
  });

  const handlerToggle = async () => {
    if (!validationInput()) return;

    const currentData = {
      name: current.name,
      lastName: current.lastName,
      age: Number(current.age),
      photo: photoUri,
    };

    //Add
    if (queryUser.data === null) {
      setCurrentError({ error_age: "", error_lastName: "", error_name: "" });
      createUserMutation.mutate({
        ...currentData,
      });
      return;
    }
    setCurrentError({ error_age: "", error_lastName: "", error_name: "" });
    //Update
    if (queryUser.data) {
      updateUserMutation.mutate({
        id: queryUser.data.id,
        photo: photoUri,
        ...current,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-[280px] bg-light-primary dark:bg-dark-primary rounded-b-[4rem] px-6 pt-12 items-center">
          <TouchableOpacity
            onPress={pickImage}
            className="w-20 h-20 rounded-full bg-white/20 items-center justify-center mb-3 border border-white/40 overflow-hidden shadow-sm z-50"
          >
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="camera" size={32} color="#ffffff" />
            )}
          </TouchableOpacity>

          <Text className="text-3xl font-bold font-sans text-white mb-1">
            Agrega tus datos
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
