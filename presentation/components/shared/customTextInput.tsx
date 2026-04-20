import { FieldError } from "react-hook-form";
import {
  BlurEvent,
  InputModeOptions,
  KeyboardTypeOptions,
  Text,
  TextInput,
  View,
} from "react-native";

interface Props {
  label: string;
  className?: string;
  textClassName?: string;
  placeholder: string;
  maxLength?: number;
  placeholderTextColor: string;
  value?: string;
  inputMode?: InputModeOptions;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  onBlur?: (e: BlurEvent) => void;
  fieldError?: FieldError;
  showErrorText?: boolean;
}

export default function CustomTextInput({
  label,
  className = "mb-4",
  placeholder,
  placeholderTextColor,
  keyboardType,
  value,
  multiline = false,
  onChangeText,
  onBlur,
  fieldError,
  inputMode = "text",
  maxLength,
  showErrorText = true,
  textClassName = "bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text px-4 py-3 rounded-2xl font-sans",
}: Props) {
  return (
    <View className={className}>
      <View className="flex-row justify-between items-center mb-2 mx-1">
        <Text
          className={`font-sans text-sm ${
            fieldError ? "text-red-500" : "text-light-icon dark:text-dark-icon"
          }`}
        >
          {label}
        </Text>
        {fieldError && showErrorText && (
          <Text className="text-red-500 text-xs">Requerido</Text>
        )}
      </View>
      <TextInput
        className={`${textClassName} border-2 ${
          fieldError ? "border-red-500" : "border-transparent"
        }`}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        inputMode={inputMode}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        onBlur={onBlur}
        maxLength={maxLength}
      />
    </View>
  );
}
