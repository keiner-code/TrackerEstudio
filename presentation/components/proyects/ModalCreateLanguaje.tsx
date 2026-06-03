import { IconOption, languageData } from "@/constants/icons";
import useModalCreateLanguage from "@/presentation/hooks/useModalCreateLanguage";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export default function ModalCreateLanguaje({
  isModalVisible,
  setModalVisible,
}: Props) {
  const { colorScheme, handleCreateLanguage } = useModalCreateLanguage({
    setModalVisible,
  });

  const [languageSelected, setLanguageSelected] = useState<IconOption>();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}
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
            onPress={() => {
              setModalVisible(false);
              setLanguageSelected(undefined);
            }}
          >
            <Ionicons name="close" size={24} color={colorScheme.icon} />
          </TouchableOpacity>
          <ScrollView
            style={{ maxHeight: 350 }}
            showsVerticalScrollIndicator={true}
          >
            {languageData.map((item) => (
              <TouchableOpacity
                className="justify-between"
                key={item.id}
                onPress={() => {
                  setLanguageSelected((previous) => {
                    if (previous?.label === item.label) return undefined;
                    return item;
                  });
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <View className="flex-row">
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.color}
                  />
                  <Text
                    style={{
                      marginLeft: 12,
                      color: colorScheme.text,
                    }}
                  >
                    {item.label}
                  </Text>
                </View>
                {languageSelected?.label === item.label && (
                  <Ionicons
                    name="checkmark"
                    color={colorScheme.text}
                    size={20}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="flex items-end p-2 mb-1">
            {languageSelected !== undefined ? (
              <TouchableOpacity
                onPress={() => {
                  handleCreateLanguage({
                    color: languageSelected.color,
                    icon: languageSelected.icon,
                    name: languageSelected.label,
                    project_size: 0,
                  });
                }}
              >
                <Text className="font-sans text-light-text dark:text-dark-text">
                  Comfirmar
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="p-2 mb-2" />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
