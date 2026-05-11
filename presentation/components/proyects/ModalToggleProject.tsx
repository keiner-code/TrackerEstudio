import { Colors } from "@/constants/colors";
import { days_of_week } from "@/constants/day_of_week";
import { Project } from "@/interfaces";
import useModalToggleProject from "@/presentation/hooks/useModalToggleProject";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import {
  Modal,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import CustomPickerInput from "../shared/CustomPickerInput";
import CustomTextInput from "../shared/customTextInput";

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  isCreate: boolean;
  project?: Project | undefined;
}

export default function ModalToggleProject({
  isModalVisible,
  setModalVisible,
  isCreate,
  project,
}: Props) {
  const colorScheme = useColorScheme() === "dark" ? Colors.dark : Colors.light;

  const {
    control,
    handleSubmit,
    errors,
    createMutation,
    handleToggleProject,
    queryLanguages,
  } = useModalToggleProject(setModalVisible, isCreate, project);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View
        className="flex-1 mt-28 items-center px-6"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <View className="w-full bg-light-surface dark:bg-dark-surface rounded-3xl p-6 shadow-lg border border-transparent dark:border-dark-border">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold font-sans text-light-text dark:text-dark-text">
              {isCreate ? "Nuevo" : "Editar"} Proyecto
            </Text>
            {createMutation.isError && (
              <Text className="text-red-500 font-bold font-sans text-base">
                Error al {isCreate ? "Crear" : "Editar"} el proyecto
              </Text>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="p-1"
            >
              <Ionicons name="close" size={24} color={colorScheme.icon} />
            </TouchableOpacity>
          </View>

          <Controller
            control={control}
            name="title"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="Nombre del proyecto"
                placeholder="Ej. Tracker Estudio"
                placeholderTextColor={colorScheme.icon}
                keyboardType="default"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                fieldError={errors.title}
              />
            )}
          />

          <Controller
            control={control}
            name="language_id"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <View className="mb-4">
                  <Text
                    className="mb-2 text-sm font-sans"
                    style={{ color: colorScheme.text }}
                  >
                    Selecione el lenguaje
                  </Text>

                  <View
                    className="rounded-3xl border"
                    style={{
                      borderColor: colorScheme.border,
                      backgroundColor: colorScheme.surface,
                    }}
                  >
                    <CustomPickerInput onChange={onChange} value={value}>
                      <Picker.Item
                        label="Selecciona un lenguaje"
                        value=""
                        color={colorScheme.icon}
                      />

                      {queryLanguages.data?.length === 0 ? (
                        <Picker.Item
                          label="Por favor agregue un lenguaje de programación"
                          value=""
                          color={colorScheme.text}
                        />
                      ) : queryLanguages.isPending ? (
                        <Picker.Item
                          label="Cargando..."
                          value=""
                          color={colorScheme.text}
                        />
                      ) : (
                        queryLanguages.data!.map((option) => (
                          <Picker.Item
                            key={option.id}
                            label={option.name}
                            value={option.id.toString()}
                            color={option.color}
                          />
                        ))
                      )}
                    </CustomPickerInput>
                  </View>
                </View>
              );
            }}
          />

          <Controller
            control={control}
            name="description"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="Descripción"
                placeholder="Ej. Proyecto para gestionar estudios"
                placeholderTextColor={colorScheme.icon}
                keyboardType="default"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                fieldError={errors.description}
                multiline={true}
              />
            )}
          />

          <Controller
            control={control}
            name="study_day"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => {
              return (
                <View className="mb-4">
                  <Text
                    className="mb-2 text-sm font-sans"
                    style={{ color: colorScheme.text }}
                  >
                    Selecione el dia que lo trabajara
                  </Text>

                  <View
                    className="rounded-3xl border"
                    style={{
                      borderColor: colorScheme.border,
                      backgroundColor: colorScheme.surface,
                    }}
                  >
                    <CustomPickerInput onChange={onChange} value={value}>
                      <Picker.Item
                        label="Selecciona un dia"
                        value=""
                        color={colorScheme.icon}
                      />

                      {days_of_week.map((option) => (
                        <Picker.Item
                          key={option.value}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </CustomPickerInput>
                  </View>
                </View>
              );
            }}
          />

          <TouchableOpacity
            onPress={handleSubmit(handleToggleProject)}
            className="bg-light-primary dark:bg-dark-primary py-4 rounded-full items-center mb-2"
          >
            <Text className="text-white font-bold font-sans text-base">
              {isCreate ? "Crear" : "Editar"} Proyecto
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
