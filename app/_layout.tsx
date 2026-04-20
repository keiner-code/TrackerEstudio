import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as SQLite from "expo-sqlite";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { runMigrations } from "@/infraestructure/data/migrations/migration-executor";
import CustomDrawer from "@/presentation/components/layouts/CustomDrawer";

const DATABASE_NAME = process.env.EXPO_PUBLIC_DATABASE_NAME;

const DB = SQLite.openDatabaseSync(DATABASE_NAME!);

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
  });
  const colorScheme = useColorScheme();

  useDrizzleStudio(DB);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SQLiteProvider
          databaseName={DATABASE_NAME!}
          onInit={async () => runMigrations()}
        >
          <CustomDrawer />
        </SQLiteProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
