import { UpdateTimes, useTimerToDay } from "@/presentation/hooks/useTimerToDay";
import { formatHour } from "@/utils/formatHour";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import CustomTextInput from "../shared/customTextInput";

type Props = UpdateTimes;

export default function AddTimerToDay({
  id,
  total_hours,
  hour_for_day,
}: Props) {
  const { theme, control, errors, handleSubmit, handlerUpdate } = useTimerToDay(
    { id, total_hours },
  );

  return (
    <View className="bg-light-surface mb-6 dark:bg-dark-surface rounded-3xl p-6 shadow-sm border border-transparent dark:border-dark-border">
      <View className="flex-row items-center mb-2">
        <Text className="text-light-success dark:text-dark-success font-bold font-sans text-sm">
          Ultimo tiempo invertido: {formatHour(hour_for_day)}
        </Text>
      </View>

      <View className="flex-row items-center mb-6">
        <View className="w-12 h-12 bg-light-background dark:bg-dark-background rounded-2xl items-center justify-center mr-4">
          <Ionicons name="timer-outline" size={24} color={theme.primary} />
        </View>
        <Text className="text-light-text dark:text-dark-text font-bold font-sans text-xl">
          Tiempo Invertido hoy
        </Text>
      </View>

      <View className="flex-row gap-3 mb-8">
        <Controller
          control={control}
          name="hour"
          rules={{
            required: false,
            max: 12,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              textClassName="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text px-2 py-4 rounded-2xl font-mono  text-center font-bold text-2xl"
              className="flex-1"
              label="Horas"
              placeholder="00"
              placeholderTextColor={theme.icon}
              inputMode="numeric"
              value={value?.toString() ?? ""}
              keyboardType="numeric"
              onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
              onBlur={onBlur}
              maxLength={2}
              fieldError={errors.hour}
              showErrorText={false}
            />
          )}
        />
        <View className="justify-center pt-6">
          <Text className="text-light-icon dark:text-dark-icon font-bold font-mono text-2xl">
            :
          </Text>
        </View>

        <Controller
          control={control}
          name="minute"
          rules={{
            required: true,
            max: 59,
            min: 1,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              textClassName="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text px-2 py-4 rounded-2xl font-mono text-center font-bold text-2xl"
              className="flex-1"
              label="Minutos"
              placeholder="00"
              placeholderTextColor={theme.icon}
              inputMode="numeric"
              keyboardType="numeric"
              value={value?.toString() || ""}
              onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
              onBlur={onBlur}
              maxLength={2}
              fieldError={errors.minute}
              showErrorText={false}
            />
          )}
        />

        <View className="justify-center pt-6">
          <Text className="text-light-icon dark:text-dark-icon font-bold font-mono text-2xl">
            :
          </Text>
        </View>

        <Controller
          control={control}
          name="second"
          rules={{
            required: true,
            max: 59,
            min: 1,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomTextInput
              textClassName="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text px-2 py-4 rounded-2xl font-mono text-center font-bold text-2xl"
              className="flex-1"
              label="Segundos"
              placeholder="00"
              placeholderTextColor={theme.icon}
              inputMode="numeric"
              keyboardType="numeric"
              value={value?.toString() || ""}
              onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
              onBlur={onBlur}
              maxLength={2}
              fieldError={errors.second}
              showErrorText={false}
            />
          )}
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit(handlerUpdate)}
        className="bg-light-primary dark:bg-dark-primary py-4 rounded-2xl items-center flex-row justify-center"
      >
        <Ionicons
          name="add-circle-outline"
          size={22}
          color="#ffffff"
          style={{ marginRight: 8 }}
        />
        <Text className="text-white font-bold font-sans text-base">
          Agregar Tiempo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
