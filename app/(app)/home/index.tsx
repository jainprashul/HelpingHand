import React, { useEffect } from 'react'
import { Avatar, Button, Card, FAB, Text, TextInput } from 'react-native-paper'
import { View, StyleSheet, ImageBackground, ToastAndroid } from 'react-native'
import {Stack, router} from "expo-router"
import { useAppDispatch } from '../../../store/hooks'
import { theme } from '../../../style/theme'
import { supabase } from '../../../lib/supabase'

type Props = {}

const Home = (props: Props) => {
    const dispatch = useAppDispatch();

    

    useEffect(() => {
     
    }, [])

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "Home",
            }} />
           <Text>Home, Logged IN</Text>

           <Button onPress={() => {
                router.push('/(app)/profile');
            }}>Profile</Button>
           <Button onPress={() => {
                router.replace('/login');
                ToastAndroid.show('Logged Out.', ToastAndroid.SHORT);
            }}>Logout</Button>

            <FAB style={styles.fab} icon="plus" onPress={() => {
                router.push('/(app)/addPost');
            }} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: theme.colors.surface,
    },
    card: {
        marginBottom: 20,
    },
    input: { marginBottom: 20, backgroundColor: theme.colors.background },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
    },
});
