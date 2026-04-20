import { languageColorOptions } from "@/constants/colors";
import { iconOptions } from "@/constants/icons";
import useModalCreateLanguage from "@/presentation/hooks/useModalCreateLanguage";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "../shared/customTextInput";

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export default function ModalCreateLanguaje({
  isModalVisible,
  setModalVisible,
}: Props) {
  const {
    mutation,
    colorScheme,
    control,
    errors,
    open,
    setOpen,
    handleSubmit,
    handleCreateLanguage,
  } = useModalCreateLanguage({ setModalVisible });

  const [openColor, setOpenColor] = useState(false);

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
              Nuevo lenguaje de programacion
            </Text>
            {mutation.isError && (
              <Text className="text-red-500 font-bold font-sans text-base">
                Error al crear el lenguaje
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
            name="name"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomTextInput
                label="Nombre del lenguaje"
                placeholder="Ej. Python"
                placeholderTextColor={colorScheme.icon}
                keyboardType="default"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                fieldError={errors.name}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
              const selected = languageColorOptions.find(
                (opt) => opt.value === value,
              );

              return (
                <View className="mb-4">
                  <Text
                    className="mb-2 text-sm font-sans"
                    style={{ color: colorScheme.text }}
                  >
                    Color del lenguaje
                  </Text>

                  <Pressable
                    onPress={() => setOpenColor(true)}
                    style={{
                      padding: 12,
                      borderRadius: 16,
                      backgroundColor: colorScheme.surface,
                    }}
                  >
                    <View className="border border-slate-700 h-14 w-full rounded-md flex-row items-center gap-2 pl-2">
                      {selected ? (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: selected.value,
                          }}
                        />
                      ) : null}
                      <View>
                        <Text
                          className="text-lg"
                          style={{ color: colorScheme.text }}
                        >
                          {selected?.label ?? "Selecciona un color"}
                        </Text>
                      </View>
                    </View>
                  </Pressable>

                  <Modal visible={openColor} transparent animationType="fade">
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
                        {languageColorOptions.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                              onChange(item.value);
                              setOpenColor(false);
                            }}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              paddingVertical: 12,
                            }}
                          >
                            <View
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                backgroundColor: item.value,
                              }}
                            />
                            <Text
                              style={{
                                marginLeft: 12,
                                color: colorScheme.text,
                              }}
                            >
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </Modal>
                </View>
              );
            }}
          />

          <Controller
            control={control}
            name="icon"
            render={({ field: { onChange, value } }) => {
              const selected = iconOptions.find((opt) => opt.icon === value);

              return (
                <>
                  <Pressable
                    onPress={() => setOpen(true)}
                    style={{
                      padding: 12,
                      borderRadius: 16,
                      backgroundColor: colorScheme.surface,
                    }}
                  >
                    <View className="border border-slate-700  h-14 w-full rounded-md flex-row items-center gap-2 pl-2 ">
                      {selected ? (
                        <View>
                          <Ionicons
                            name={selected.icon as any}
                            size={20}
                            color="white"
                          />
                        </View>
                      ) : null}
                      <View>
                        <Text
                          className="text-lg"
                          style={{ color: colorScheme.text }}
                        >
                          {selected?.label ?? "Selecciona un icono"}
                        </Text>
                      </View>
                    </View>
                  </Pressable>

                  <Modal visible={open} transparent animationType="fade">
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
                        {iconOptions.map((item) => (
                          <TouchableOpacity
                            key={item.id}
                            onPress={() => {
                              onChange(item.icon);
                              setOpen(false);
                            }}
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              paddingVertical: 12,
                            }}
                          >
                            <Ionicons
                              name={item.icon as any}
                              size={20}
                              color="white"
                            />
                            <Text
                              style={{
                                marginLeft: 12,
                                color: colorScheme.text,
                              }}
                            >
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </Modal>
                </>
              );
            }}
          />

          <TouchableOpacity
            onPress={handleSubmit(handleCreateLanguage)}
            className="bg-light-primary dark:bg-dark-primary py-4 rounded-full items-center mb-2"
          >
            <Text className="text-white font-bold font-sans text-base">
              Crear Lenguaje
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
