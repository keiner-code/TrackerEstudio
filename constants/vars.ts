import { ColorSchemeName } from "react-native";
import { Colors } from "./colors";

export const PROJECT = "projects";
export const LANGUAGES = "languages";
export const SCHEDULE = "schedule";
export const COMMENTS = "comments";

export const THEME = (colorScheme: ColorSchemeName) =>
  colorScheme === "dark" ? Colors.dark : Colors.light;
