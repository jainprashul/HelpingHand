
import { Slot, Stack } from "expo-router";
import { theme } from "../../style/theme";
import { Icon } from "react-native-paper";


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
    >
        
    </Stack>
    );
  }