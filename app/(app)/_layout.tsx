import { Drawer } from "./Drawer";

export default function RootLayout() {
    return (
        <Drawer>
          <Drawer.Screen
            name="home" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "Home",
              title: "overview",
            }}
          />
          <Drawer.Screen
            name="user/[id]" // This is the name of the page and must match the url from root
            options={{
              drawerLabel: "User",
              title: "overview",
            }}
          />
        </Drawer>
    );
  }