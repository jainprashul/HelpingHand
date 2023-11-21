import { View, StyleSheet, ToastAndroid } from "react-native";
import { theme } from "../../../style/theme";
import { Avatar, Divider, Drawer, Menu, Text } from "react-native-paper";
import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { router } from "expo-router";
import { supabase } from "../../../lib/supabase";

type Props = {
    anchor: () => React.ReactNode;
    open: boolean
    setOpen: (open: boolean) => void
}

export default function MDrawer({ open, setOpen, anchor }: Props) {
    const profile = useAppSelector((state) => state.auth.profile);
    

    return <Menu visible={open}
        anchor={{
            x: 0,
            y: 0,
        }}
        onDismiss={() => {
            console.log("dismiss");
            setOpen(false);
        }} style={styles.drawer}>

        <View style={{ padding: 20, flexDirection: 'row', gap: 20 }}>
            <Avatar.Image size={50} source={{ uri: profile?.avatar ?? "" }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{profile?.name}</Text>
        </View>
        <Divider style={{ marginVertical: 10 }} bold />


        <Menu.Item leadingIcon='pencil' onPress={() => {
            router.push('/(app)/addPost');
            setOpen(false);
        }} title="Create Job Listing" />
        <Menu.Item leadingIcon={'account'} onPress={() => {
            router.push('/(app)/profile');
            setOpen(false);
        }} title="Profile" />
        <Menu.Item leadingIcon={'inbox'} onPress={() => {
            router.push('/(app)/messages');
            setOpen(false);
        }} title="Messages" />
        <Menu.Item leadingIcon={'cog'} onPress={() => {
            router.push('/(app)/settings');
            setOpen(false);
        }} title="Settings" />
        <Menu.Item leadingIcon={'logout'} onPress={() => {
            supabase.auth.signOut();
            router.replace('/login');
            setOpen(false);
            ToastAndroid.show('Logged Out.', ToastAndroid.SHORT);
        }} title="Logout" />
    </Menu>
}

const styles = StyleSheet.create({
    drawer: {
        width: "70%",

        backgroundColor: theme.colors.surface,
        zIndex: 1000,
        marginTop: 50 + 50,
        height: "100%",

        top: 0,
        left: 0,
    }
})