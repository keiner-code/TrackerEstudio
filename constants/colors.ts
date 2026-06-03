const tintColorLight = "#4F46E5"; // Indigo 600
const tintColorDark = "#818CF8"; // Indigo 400

export const Colors = {
  light: {
    text: "#0F172A", // Slate 900
    background: "#F8FAFC", // Slate 50
    surface: "#FFFFFF",
    primary: tintColorLight,
    secondary: "#0EA5E9", // Sky 500
    success: "#10B981", // Emerald 500
    error: "#EF4444", // Red 500
    tint: tintColorLight,
    icon: "#64748B", // Slate 500
    tabIconDefault: "#64748B",
    tabIconSelected: tintColorLight,
    border: "#E2E8F0", // Slate 200
  },
  dark: {
    text: "#F8FAFC", // Slate 50
    background: "#0F172A", // Slate 900
    surface: "#1E293B", // Slate 800
    primary: tintColorDark,
    secondary: "#38BDF8", // Sky 400
    success: "#34D399", // Emerald 400
    error: "#F87171", // Red 400
    tint: tintColorDark,
    icon: "#94A3B8", // Slate 400
    tabIconDefault: "#94A3B8",
    tabIconSelected: tintColorDark,
    border: "#334155", // Slate 700
  },
};

export const languageColorOptions = [
  { id: "javascript", label: "JavaScript", value: "#F7DF1E" },
  { id: "python", label: "Python", value: "#306998" },
  { id: "typescript", label: "TypeScript", value: "#3178C6" },
  { id: "java", label: "Java", value: "#007396" },
  { id: "csharp", label: "C#", value: "#68217A" },
  { id: "go", label: "Go", value: "#00ADD8" },
  { id: "php", label: "PHP", value: "#777BB4" },
  { id: "kotlin", label: "Kotlin", value: "#0095D5" },
  { id: "dart", label: "Dart", value: "#0175C2" },
  { id: "html", label: "HTML", value: "#E34F26" },
  { id: "css", label: "CSS", value: "#1572B6" },
  { id: "react", label: "React", value: "#61DAFB" },
  { id: "vue", label: "Vue", value: "#4FC08D" },
  { id: "angular", label: "Angular", value: "#DD0031" },
  { id: "node", label: "Node.js", value: "#339933" },
  { id: "git", label: "Git", value: "#F05032" },
  { id: "github", label: "GitHub", value: "#181717" },
  { id: "aws", label: "AWS", value: "#FF9900" },
  { id: "azure", label: "Azure", value: "#0078D4" },
  { id: "docker", label: "Docker", value: "#2496ED" },
  { id: "kubernetes", label: "Kubernetes", value: "#326CE5" },
  { id: "dotnet", label: ".NET", value: "#512BD4" },
  { id: "next", label: "Next.js", value: "#000000" },
  { id: "nest", label: "NestJS", value: "#E0234E" },
];
