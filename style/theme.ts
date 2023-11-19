import { MD3LightTheme } from "react-native-paper";

export const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
    // primary: '#D32F2F',
    // accent: '#f1c40f',
  },
};


