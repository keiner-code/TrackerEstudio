import { Colors } from "@/constants/colors";
import { Project } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

interface Props {
  pickerVisible: boolean;
  setPickerVisible: (value: boolean) => void;
  setSelectedItem: (value: Project) => void;
  selectedItem: Project;
  projects: Project[];
}

export default function ModalSelectorProject({
  pickerVisible,
  setPickerVisible,
  setSelectedItem,
  selectedItem,
  projects,
}: Props) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <Modal visible={pickerVisible} transparent animationType="fade">
      <TouchableOpacity
        activeOpacity={1}
        className="flex-1 bg-black/60 justify-end items-center"
        onPress={() => setPickerVisible(false)}
      >
        <View className="bg-light-background dark:bg-dark-background w-full rounded-t-3xl pt-2 pb-8 max-h-[70%]">
          <View className="w-12 h-1.5 bg-light-border dark:bg-dark-border rounded-full align-center mx-auto mb-4" />
          <View className="px-6 flex-row justify-between items-center mb-4">
            <Text className="font-bold text-light-text dark:text-dark-text text-xl font-sans">
              Tus Elementos
            </Text>
            <TouchableOpacity
              onPress={() => setPickerVisible(false)}
              className="bg-light-surface dark:bg-dark-surface p-2 rounded-full"
            >
              <Ionicons name="close" size={20} color={theme.icon} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="px-4">
            {projects.length === 0 ? (
              <View>
                <Text>Agregue un proyecto</Text>
              </View>
            ) : (
              projects.map((item) => (
                <TouchableOpacity
                  key={item.id + item.title}
                  onPress={() => {
                    setSelectedItem(item);
                    setPickerVisible(false);
                  }}
                  className={`flex-row items-center p-4 rounded-2xl mb-2 border border-transparent dark:border-dark-border ${
                    selectedItem.id === item.id
                      ? "bg-light-surface dark:bg-dark-surface border-light-primary/30 dark:border-dark-primary/30"
                      : "bg-transparent"
                  }`}
                >
                  <View
                    className={`w-12 h-12 rounded-full items-center justify-center mr-4 border ${
                      selectedItem.id === item.id
                        ? "bg-light-primary/10 dark:bg-dark-primary/10 border-light-primary dark:border-dark-primary"
                        : "bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border"
                    }`}
                  >
                    <Ionicons
                      name={
                        item.language.icon as keyof typeof Ionicons.glyphMap
                      }
                      size={24}
                      color={
                        selectedItem.id === item.id ? theme.primary : theme.icon
                      }
                    />
                  </View>
                  <View className="flex-1">
                    <Text
                      className={`font-sans font-bold text-[17px] mb-1 ${
                        selectedItem.id === item.id
                          ? "text-light-primary dark:text-dark-primary"
                          : "text-light-text dark:text-dark-text"
                      }`}
                    >
                      {item.title}
                    </Text>
                    <Text className="text-light-icon dark:text-dark-icon font-sans text-sm font-medium">
                      Progreso: {item.progress}%
                    </Text>
                  </View>
                  {selectedItem.id === item.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={theme.primary}
                    />
                  )}
                </TouchableOpacity>
              ))
            )}
            <View className="h-10" />
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
