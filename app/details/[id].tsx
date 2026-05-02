import AddTimerToDay from "@/presentation/components/details/AddTimerToDay";
import CommentInputText from "@/presentation/components/details/CommentInputText";
import CommentsContent from "@/presentation/components/details/CommetsContent";
import ModalSelectorProject from "@/presentation/components/details/ModalSelectorProject";
import ProgressCard from "@/presentation/components/details/ProgressCard";
import { useDetailsScreen } from "@/presentation/hooks/useDetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailsScreen() {
  const {
    selectedItem,
    setPickerVisible,
    theme,
    pickerVisible,
    setSelectedItem,
    projects,
  } = useDetailsScreen();
  const headerHeight = useHeaderHeight();

  return (
    <View className="flex-1 bg-light-background dark:bg-dark-background pt-6">
      {selectedItem === undefined ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Por favor agregue un proyecto</Text>
        </View>
      ) : (
        <>
          <View className="px-6 mb-2 z-10">
            <Text className="text-light-icon dark:text-dark-icon font-sans text-xs mb-2 ml-1">
              Viendo detalles de:
            </Text>

            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              className="flex-row items-center justify-between bg-light-surface dark:bg-dark-surface p-4 rounded-2xl shadow-sm border border-transparent dark:border-dark-border"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 items-center justify-center mr-3">
                  <Ionicons
                    name={
                      selectedItem.language
                        .icon as keyof typeof Ionicons.glyphMap
                    }
                    size={18}
                    color={selectedItem.language.color}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-light-text dark:text-dark-text font-bold font-sans text-lg flex-1"
                    numberOfLines={1}
                  >
                    {selectedItem.title}
                  </Text>
                  <Text
                    className="text-light-icon dark:text-dark-icon font-mono uppercase text-[10px] font-bold tracking-widest mt-0.5"
                    numberOfLines={1}
                  >
                    {selectedItem.language.name}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-down" size={24} color={theme.icon} />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={headerHeight}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="px-6"
              contentContainerStyle={{ paddingTop: 10 }}
            >
              <View className="mb-6">
                <View className="flex-row items-center mb-3">
                  <View className="bg-light-primary/20 dark:bg-dark-primary/20 px-3 py-1.5 rounded-full mr-3 border border-transparent dark:border-dark-border">
                    <Text className="text-light-primary dark:text-dark-primary font-mono font-bold text-xs uppercase tracking-wider">
                      {selectedItem.status}
                    </Text>
                  </View>
                </View>

                <ProgressCard
                  progress={selectedItem.progress}
                  project_id={selectedItem.id}
                />
              </View>

              <CommentInputText project_id={selectedItem.id} />

              <AddTimerToDay
                id={selectedItem.id}
                total_hours={selectedItem.total_hours}
                hour_for_day={selectedItem.hours_per_day}
              />

              <CommentsContent
                project_id={selectedItem.id}
                color={theme.icon}
              />

              <View className="h-10" />
            </ScrollView>
          </KeyboardAvoidingView>

          <ModalSelectorProject
            pickerVisible={pickerVisible}
            selectedItem={selectedItem}
            setPickerVisible={setPickerVisible}
            setSelectedItem={setSelectedItem}
            projects={projects}
          />
        </>
      )}
    </View>
  );
}
