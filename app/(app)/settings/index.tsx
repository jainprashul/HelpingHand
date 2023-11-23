import { Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function SettingsPage (){
    return (
        <View>
            <Stack.Screen options={{
                headerTitle: "Settings",
            }} />
            
            <Text>Settings Page</Text>
        </View>
    )
}