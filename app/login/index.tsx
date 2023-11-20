import React from 'react'
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper'
import { View, StyleSheet, ImageBackground, ToastAndroid } from 'react-native'

import { useAppDispatch } from '../../store/hooks'
import { login } from '../../store/context/authSlice'
import { theme } from '../../style/theme'
import {Link, router} from "expo-router"

const iconUri = require('../../assets/icon.png')

type Props = {}

const Login = (props: Props) => {
    const dispatch = useAppDispatch();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState('');


    const _onLoginPressed = async () => {
        try {
            console.log("Login Pressed");
            setLoading(true);
            if (username.length === 0 || password.length === 0) {
                throw new Error("Username or Password cannot be empty");
            }
            const res = await dispatch(login({ username, password }))
            if (res.payload) {
                router.replace('/(app)/home');
                ToastAndroid.show('Logged In.', ToastAndroid.SHORT);
            }
            else {
                throw new Error("Invalid Credentials");
            }
        } catch (error: any) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Card.Cover source={iconUri} style={{ width: 150, height: 150, alignSelf: 'center', backgroundColor: "transparent" }} />
            <Text variant='headlineMedium' style={{ textAlign: 'center', margin: 20, color: "black" }}>Helping Hands</Text>
            <Card style={styles.card}>
                <Text variant='titleLarge' style={{ textAlign: 'center', margin: 20, }}>Login</Text>
                <Card.Content>
                    <TextInput
                        label={'Email'}
                        placeholder='Enter your email address'
                        style={styles.input}
                        value={username}
                        keyboardType='email-address'
                        onChangeText={text => { setUsername(text); setError(''); }}
                    />
                    <TextInput
                        label={'Password'}
                        placeholder='Password'
                        style={styles.input}
                        value={password}
                        secureTextEntry={!visible}
                        onChangeText={text => { setPassword(text); setError(''); }}
                        right={<TextInput.Icon icon={visible ? 'eye-off' : 'eye'} onPress={() => { setVisible(!visible) }} />}
                    />

                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{error}</Text>
                    <Button mode='contained' disabled={loading} style={{ marginBottom: 20, }} onPress={_onLoginPressed}>Login</Button>
                    <Card.Actions>
                        <Card.Content>
                            <Link href={'/signup'}>Don't have an account? Signup here.</Link>
                        </Card.Content>
                    </Card.Actions>
                </Card.Content>

            </Card>
        </View>
    )
}

export default Login

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
