import React from 'react'
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper'
import { View, StyleSheet, ImageBackground, ToastAndroid } from 'react-native'
import {router} from "expo-router"
import { useAppDispatch } from '../../../store/hooks'
import { theme } from '../../../style/theme'

type Props = {}

const Home = (props: Props) => {
    const dispatch = useAppDispatch();

    return (
        <View style={styles.container}>
           <Text>Home, Logged IN</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 50,
        backgroundColor: theme.colors.surface,
    },
    card: {
        marginBottom: 20,
    },
    input: { marginBottom: 20, backgroundColor: theme.colors.background },
});
