import { Platform } from "react-native";

export const Fonts = {
  // Las fuentes cargadas en app/_layout.tsx
  family: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semiBold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
    monoRegular: "JetBrainsMono_400Regular",
    monoBold: "JetBrainsMono_700Bold",
  },
  
  // Fallbacks por si acaso (para uso rápido si no están cargadas)
  system: Platform.select({
    ios: {
      sans: "system-ui",
      mono: "Menlo",
    },
    android: {
      sans: "Roboto",
      mono: "monospace",
    },
    default: {
      sans: "sans-serif",
      mono: "monospace",
    },
  }),
  
  // Sizes for typography scale
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 32,
  }
};
