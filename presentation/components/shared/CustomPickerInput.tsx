import { Colors } from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { useColorScheme } from "react-native";

interface Props {
  onChange: (...event: any[]) => void;
  value: string;
  children: React.ReactNode;
}

export default function CustomPickerInput({
  onChange,
  value,
  children,
}: Props) {
  const colorScheme = useColorScheme() === "dark" ? Colors.dark : Colors.light;
  return (
    <Picker
      dropdownIconColor={colorScheme.icon}
      itemStyle={{ color: colorScheme.text }}
      style={{
        color: colorScheme.text,
        backgroundColor: colorScheme.surface,
      }}
      selectedValue={value ?? ""}
      onValueChange={(itemValue) => onChange(itemValue)}
    >
      {children}
    </Picker>
  );
}
