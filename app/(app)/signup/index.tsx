import React from 'react'
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper'
import { View, StyleSheet, ImageBackground, ToastAndroid } from 'react-native'

import {Link, router} from "expo-router"
import { useAppDispatch } from '../../../store/hooks'
import { theme } from '../../../style/theme'
import { userActions } from '../../../store/context/userSlice'


const iconUri = require('../../../assets/icon.png')


type Props = {}

const Signup = (props: Props) => {
    const dispatch = useAppDispatch();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState('');


    const _onSignupPressed = async () => {
        try {
            console.log("Login Pressed");
            setLoading(true);
            if (username.length === 0 || password.length === 0) {
                throw new Error("Username or Password cannot be empty");
            }

            if(password !== confirmPassword){
                throw new Error("Passwords do not match");
            }

            const res = await dispatch(userActions.addSignup({ username, password }))
            if (res.payload) {
                router.push({
                    pathname: '/signup/profile',
                    params: {
                        username,
                        password,
                        create : true
                    }
                });
                ToastAndroid.show('Sign Up.', ToastAndroid.SHORT);
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
                <Text variant='titleLarge' style={{ textAlign: 'center', margin: 20, }}>
                    Create a new Account 
                </Text>
                <Card.Content>
                    <TextInput
                        label={'Email'}
                        placeholder='Enter your email address'
                        style={styles.input}
                        value={username}
                        keyboardType='email-address'
                        returnKeyType='next'
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

                    <TextInput
                        label={'Confirm Password'}
                        placeholder='Confirm Password'
                        style={styles.input}
                        value={confirmPassword}
                        secureTextEntry={!visible}
                        onChangeText={text => { setConfirmPassword(text); setError(''); }}
                        right={<TextInput.Icon icon={visible ? 'eye-off' : 'eye'} onPress={() => { setVisible(!visible) }} />}
                    />


                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{error}</Text>
                    <Button mode='contained' disabled={loading} style={{ marginBottom: 20, }} onPress={_onSignupPressed}>Create Account</Button>
                    <Card.Actions>
                        <Card.Content>
                            <Link href={'/login'}>Already have an account?</Link>
                        </Card.Content>
                    </Card.Actions>
                </Card.Content>

            </Card>
        </View>
    )
}

export default Signup

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
