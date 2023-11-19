import React from 'react'
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper'
import { View, StyleSheet, ImageBackground, ToastAndroid } from 'react-native'

import { useAppDispatch } from '../../store/hooks'
import { login } from '../../store/context/authSlice'
import { theme } from '../../style/theme'
import {router} from "expo-router"

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
                router.replace('/home');
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
            <Card.Cover source={{
                uri: 'https://images.unsplash.com/photo-1612835244163-7c5c9e8c3c2c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwY2FyJTIwY29tcGFueXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
            }} style={{ width: 150, height: 150, alignSelf: 'center', backgroundColor: "transparent" }} />
            <Text variant='headlineMedium' style={{ textAlign: 'center', margin: 20, color: "white" }}>Highway 9 Networks</Text>
            <Card style={styles.card}>
                <Text variant='titleLarge' style={{ textAlign: 'center', margin: 20, }}>Login</Text>
                <Card.Content>
                    <TextInput
                        label={'Username'}
                        placeholder='Username'
                        style={styles.input}
                        value={username}
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
                            <Text>Forgot Password?</Text>
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
