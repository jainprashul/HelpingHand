import React from 'react'
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper'
import { StyleSheet, ScrollView, View , ToastAndroid} from 'react-native'

import { Link, useLocalSearchParams, router } from "expo-router"
import { useAppDispatch } from '../../../../store/hooks'
import { theme } from '../../../../style/theme'
import { generateUUID, randomUserAvatar } from '../../../../utils'
import { Profile } from '../../../../types/user'
import SelectDropdown from 'react-native-select-dropdown';
import { skillList } from '../../../../constants'
import { addProfile } from '../../../../store/context/userSlice'




type SignupParams = {
    username: string,
    password: string,
    create: boolean
}

type Props = {}

const CreateProfile = (props: Props) => {
    const dispatch = useAppDispatch();
    const params = useLocalSearchParams() as unknown as SignupParams;

    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');

    const [phone, setPhone] = React.useState('');

    const [avatar] = React.useState(() => randomUserAvatar());

    const [skills, setSkills] = React.useState<string[]>([]);
    const [bio, setBio] = React.useState('');

    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState('');


    const _onSave = async () => {
        try {
            const profile: Profile = {
                email: params.username,
                password: params.password,
                avatar,
                name,
                address,
                city,
                phone,
                skills,
                id: generateUUID('user')
            }

            dispatch(addProfile(profile)).then((res) => {
                if (res.payload) {
                    router.replace('/home');
                    ToastAndroid.show('Profile Created.', ToastAndroid.SHORT);
                }
                else {
                    throw new Error("Invalid Credentials");
                }
            });

            console.log("Save Pressed", profile);


        } catch (error: any) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container}>

            <Card style={styles.card}>
                <Text variant='titleMedium' style={{ textAlign: 'center', margin: 20, }}>
                    Create your Profile
                </Text>
                <Card.Content>
                    <Avatar.Image source={{
                        uri: avatar
                    }} size={150} style={{ alignSelf: 'center', backgroundColor: "transparent", marginBottom: 2 }} />
                    <TextInput
                        label={'Name'}
                        placeholder='Enter your name'
                        style={styles.input}
                        value={name}

                        returnKeyType='next'
                        onChangeText={text => { setName(text); }}
                    />
                    <TextInput
                        label={'Locality'}
                        placeholder='Enter your locality'
                        style={styles.input}
                        value={address}
                        onChangeText={text => { setAddress(text); }}
                    />

                    <TextInput
                        label={'City'}
                        placeholder='City'
                        style={styles.input}
                        value={city}
                        onChangeText={text => { setCity(text); setError(''); }}
                    />
                    <TextInput
                        label={'Contact Number'}
                        placeholder='Contact Number'
                        style={styles.input}
                        value={phone}
                        keyboardType='phone-pad'
                        onChangeText={text => { setPhone(text); setError(''); }}
                    />

                    <Text style={{ textAlign: 'left', }}>
                        Select Skills
                    </Text>
                    <SelectDropdown data={skillList}
                    buttonStyle={styles.dropdownBtn}
                    search
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        setSkills([selectedItem]);
                    }}
                    />

                    <TextInput
                        label={'Bio'}
                        placeholder="tell us about yourself"
                        style={styles.input}
                        value={bio}
                        multiline  
                        numberOfLines={3}
                        onChangeText={text => { setBio(text); setError(''); }}
                    />


                    <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{error}</Text>
                    <Button mode='contained' disabled={loading} style={{ marginBottom: 20, }} onPress={_onSave}>Save</Button>
                    <Card.Actions>
                        <Card.Content>
                        </Card.Content>
                    </Card.Actions>
                </Card.Content>

            </Card>
        </ScrollView>
    )
}

export default CreateProfile

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
    dropdownBtn : {
        width : "100%",
        height : 50,
        backgroundColor : "white",
        borderRadius : 8,
        borderWidth : 1,
        borderColor : "#444",
        marginVertical : 20,

    }
});
