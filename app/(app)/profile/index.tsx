import { Session } from '@supabase/supabase-js'
import { StyleSheet, View, Alert, Image, Pressable,  } from 'react-native'
import { Card,  Text, IconButton } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { supabase } from '../../../lib/supabase';
import { Profile } from '../../../types/user';
import { authActions } from '../../../store/context/authSlice';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfilePage(){
    const params = useLocalSearchParams();

    console.log(params, "params");
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.auth.profile);
    const user = useAppSelector((state) => state.auth.user);
    React.useEffect(() => {
        console.log(user, "user");
        supabase.from('users').select('*').eq('id', user?.id).single().then(({ data, error }) => {
            console.log(data, "data");
            dispatch(authActions.setProfile(data));
        });
    }, []);

    console.log(profile, "profile");
    return(
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "Profile",
            }} />

            <Card style={styles.card}>
            <Pressable onPress={()=>{
                router.push({
                    pathname : "/(app)/signup/profile",
                    params : {
                        profile : JSON.stringify(profile),
                    }
                })
            }} style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        borderColor: '#aaa',
                        padding: 8,
                        borderRadius: 100,
                        borderWidth: 1,
                    }}>
                    <FontAwesome name="pencil" size={30} color="#333" />
                    </Pressable>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 30,
                }}>
                <Image source={{ uri: profile?.avatar }} style={{ width: 200, height: 200 , borderRadius : 100 }} />
                </View>
                
                <Card.Content>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text variant='titleSmall'>Profile</Text>

                    <Text variant='headlineSmall'>{profile?.name}</Text>
                    <Text variant='titleSmall'>{profile?.email}</Text>
                    <Text variant='titleSmall'>{profile?.phone}</Text>
                    <Text variant='titleSmall'>{profile?.address}, {profile?.city}</Text>
                

                    <Text>{profile?.bio}</Text>
                    </View>

                    <Text variant='titleSmall'>Skills : </Text>
                    <Text style={{
                        left: 10,
                    }}>{profile?.skills}</Text>
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    card: {
        padding: 20,
        marginBottom: 20,
    },
    center : {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: { marginBottom: 20 },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
    },
});