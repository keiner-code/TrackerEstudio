import { Colors } from "@/constants/colors";
import { PROJECT } from "@/constants/vars";
import { Project } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import getAllProyectsAction from "../actions/get-all-proyect.action";

export function useDetailsScreen() {
  const [selectedItem, setSelectedItem] = useState<Project>();
  const [pickerVisible, setPickerVisible] = useState(false);
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const queryProjects = useQuery({
    queryKey: [PROJECT],
    queryFn: getAllProyectsAction,
  });

  useEffect(() => {
    if (queryProjects.data && queryProjects.data.length > 0) {
      setSelectedItem((prev) => {
        if (!prev) return queryProjects.data[0];
        const updatedItem = queryProjects.data.find((p) => p.id === prev.id);
        return updatedItem ?? queryProjects.data[0];
      });
    }
  }, [queryProjects.data]);

  return {
    theme,
    projects: queryProjects.data ?? [],
    selectedItem,
    pickerVisible,
    setPickerVisible,
    setSelectedItem,
  };
}
