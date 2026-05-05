import { THEME, USER } from "@/constants/vars";
import { CreateUser, User } from "@/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { createUserAction } from "../actions/create-user.action";
import getUserAction from "../actions/get-user.action";
import { updateUserAction } from "../actions/update-user.action";

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

export function useToggleUserScreen() {
  const colorScheme = useColorScheme();
  const theme = THEME(colorScheme);
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
        if (data.photo) {
          setPhotoUri(data.photo);
        }
      }
      return data;
    },
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permiso denegado",
        "Lo sentimos, necesitamos permisos de la galería para que esto funcione.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const filename = uri.split("/").pop();
      if (!FileSystem.documentDirectory) return;
      const newPath = FileSystem.documentDirectory + filename;

      try {
        await FileSystem.copyAsync({
          from: uri,
          to: newPath,
        });
        setPhotoUri(newPath);
      } catch (error) {
        console.error("Error al copiar la imagen:", error);
        setPhotoUri(uri);
      }
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
      queryClient.invalidateQueries({ queryKey: [USER] });
      Alert.alert("¡Éxito!", "Usuario Creado");
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
  return {
    theme,
    handlerToggle,
    pickImage,
    currentError,
    photoUri,
    current,
    setCurrent,
    queryUser,
  };
}
