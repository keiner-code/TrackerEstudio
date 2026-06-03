import { Colors } from "@/constants/colors";
import { days_of_week } from "@/constants/day_of_week";
import { Project } from "@/interfaces";
import useModalToggleProject from "@/presentation/hooks/useModalToggleProject";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
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

  const [openLanguageModal, setOpenLanguageModal] = useState(false);
  const [openDayModal, setOpenDayModal] = useState(false);

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
              const selectedLanguage = queryLanguages.data?.find(
                (option) => option.id.toString() === value,
              );

              return (
                <View className="mb-4">
                  <Text
                    className="mb-2 text-sm font-sans"
                    style={{ color: colorScheme.text }}
                  >
                    Selecione el lenguaje
                  </Text>

                  <Pressable
                    onPress={() => setOpenLanguageModal(true)}
                    style={{
                      paddingInline: 12,
                      borderRadius: 16,
                      backgroundColor: colorScheme.background,
                    }}
                  >
                    <View className="h-14 w-full rounded-md flex-row items-center gap-2 pl-2">
                      {selectedLanguage ? (
                        <Ionicons
                          name={selectedLanguage.icon as any}
                          size={20}
                          color={selectedLanguage.color}
                        />
                      ) : null}
                      <View>
                        <Text
                          className="text-lg"
                          style={{ color: colorScheme.text }}
                        >
                          {selectedLanguage?.name ?? "Selecciona un lenguaje"}
                        </Text>
                      </View>
                    </View>
                  </Pressable>

                  <Modal
                    visible={openLanguageModal}
                    transparent
                    animationType="fade"
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,0.4)",
                      }}
                    >
                      <View
                        style={{
                          margin: 24,
                          borderRadius: 20,
                          backgroundColor: colorScheme.surface,
                          padding: 16,
                        }}
                      >
                        <TouchableOpacity
                          className="items-end"
                          onPress={() => setOpenLanguageModal(false)}
                        >
                          <Ionicons
                            name="close"
                            size={24}
                            color={colorScheme.icon}
                          />
                        </TouchableOpacity>

                        {queryLanguages.isPending ? (
                          <Text
                            style={{
                              color: colorScheme.text,
                              paddingVertical: 12,
                            }}
                          >
                            Cargando...
                          </Text>
                        ) : queryLanguages.data?.length === 0 ? (
                          <Text
                            style={{
                              color: colorScheme.text,
                              paddingVertical: 12,
                            }}
                          >
                            Por favor agregue un lenguaje de programación
                          </Text>
                        ) : (
                          <ScrollView
                            style={{ maxHeight: 350 }}
                            showsVerticalScrollIndicator={true}
                          >
                            {queryLanguages.data!.map((option) => (
                              <TouchableOpacity
                                key={option.id}
                                onPress={() => {
                                  onChange(option.id.toString());
                                  setOpenLanguageModal(false);
                                }}
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  paddingVertical: 12,
                                }}
                              >
                                <Ionicons
                                  name={option.icon as any}
                                  size={20}
                                  color={option.color}
                                />
                                <Text
                                  style={{
                                    marginLeft: 12,
                                    color: colorScheme.text,
                                  }}
                                >
                                  {option.name}
                                </Text>
                                {value === option.id.toString() && (
                                  <Ionicons
                                    name="checkmark"
                                    color={colorScheme.text}
                                    size={20}
                                    style={{ marginLeft: "auto" }}
                                  />
                                )}
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        )}
                      </View>
                    </View>
                  </Modal>
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
              const selectedDay = days_of_week.find(
                (option) => option.value === value,
              );

              return (
                <View className="mb-4">
                  <Text
                    className="mb-2 text-sm font-sans"
                    style={{ color: colorScheme.text }}
                  >
                    Selecione el dia que lo trabajara
                  </Text>

                  <Pressable
                    onPress={() => setOpenDayModal(true)}
                    style={{
                      paddingInline: 12,
                      borderRadius: 16,
                      backgroundColor: colorScheme.background,
                    }}
                  >
                    <View className="h-14 w-full rounded-md flex-row items-center gap-2 pl-2">
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={colorScheme.icon}
                      />
                      <View>
                        <Text
                          className="text-lg"
                          style={{ color: colorScheme.text }}
                        >
                          {selectedDay?.label ?? "Selecciona un dia"}
                        </Text>
                      </View>
                    </View>
                  </Pressable>

                  <Modal
                    visible={openDayModal}
                    transparent
                    animationType="fade"
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        backgroundColor: "rgba(0,0,0,0.4)",
                      }}
                    >
                      <View
                        style={{
                          margin: 24,
                          borderRadius: 20,
                          backgroundColor: colorScheme.surface,
                          padding: 16,
                        }}
                      >
                        <TouchableOpacity
                          className="items-end"
                          onPress={() => setOpenDayModal(false)}
                        >
                          <Ionicons
                            name="close"
                            size={24}
                            color={colorScheme.icon}
                          />
                        </TouchableOpacity>

                        <ScrollView
                          style={{ maxHeight: 350 }}
                          showsVerticalScrollIndicator={true}
                        >
                          {days_of_week.map((option) => (
                            <TouchableOpacity
                              key={option.value}
                              onPress={() => {
                                onChange(option.value);
                                setOpenDayModal(false);
                              }}
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingVertical: 12,
                              }}
                            >
                              <Ionicons
                                name="calendar-outline"
                                size={20}
                                color={colorScheme.icon}
                              />
                              <Text
                                style={{
                                  marginLeft: 12,
                                  color: colorScheme.text,
                                }}
                              >
                                {option.label}
                              </Text>
                              {value === option.value && (
                                <Ionicons
                                  name="checkmark"
                                  color={colorScheme.text}
                                  size={20}
                                  style={{ marginLeft: "auto" }}
                                />
                              )}
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    </View>
                  </Modal>
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
