import { Drawer } from "expo-router/drawer";
import { Stack } from "expo-router";
import { theme } from "../../style/theme";

export default function RootLayout() {
    return (
      <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
      }}
    />
    );
  }