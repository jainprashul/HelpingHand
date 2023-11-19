import {
    // Import the creation function
    createDrawerNavigator,
    // Import the types
    DrawerNavigationOptions,
  } from "@react-navigation/drawer";
  
  import { withLayoutContext } from "expo-router";
  
  const { Navigator } = createDrawerNavigator();
  
  // This can be used like `<Drawer />`
  // @ts-ignore
  export const Drawer = withLayoutContext<DrawerNavigationOptions,typeof Navigator >(Navigator);