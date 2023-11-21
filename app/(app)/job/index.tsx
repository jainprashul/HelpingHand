import { StyleSheet, View, Image, } from 'react-native'
import { Avatar, Button, Card, Chip, Icon, Text } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Stack, useLocalSearchParams } from 'expo-router';
import * as Linking from 'expo-linking';
import React from 'react'
import { Job } from '../../../types/job';
import moment from 'moment'
import { theme } from '../../../style/theme';
import { ScrollView } from 'react-native-gesture-handler';


export default function JobDetailPage() {
    const params = useLocalSearchParams();

    const _job: Job = JSON.parse(params.data as string);

    console.log(_job, "params");
    const dispatch = useAppDispatch();
    const profile = useAppSelector((state) => state.auth.profile);
    const user = useAppSelector((state) => state.auth.user);


    // React.useEffect(() => {
    //     console.log(user, "user");
    //     supabase.from('users').select('*').eq('id', user?.id).single().then(({ data, error }) => {
    //         console.log(data, "data");
    //         dispatch(authActions.setProfile(data));
    //     });
    // }, []);

    console.log(profile, "profile");
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "Job Details",
            }} />

            <Card.Title titleStyle={{
                fontSize: 18,
                fontWeight: 'bold'
            }} title={_job.title} left={props => <Avatar.Icon size={50} icon='post-outline' />} />

            <Text style={styles.subtitle}> Posted {moment(_job.created_at).fromNow()}</Text>


            <View style={styles.action}>
                <Button mode="contained" style={{flex : 1}} onPress={() => {
                    Linking.openURL(`tel:${_job.contact}`);
                }}
                >Contact</Button>
                <Button mode="contained" style={{flex : 1}} onPress={() => {
                    Linking.openURL(`sms:${_job.contact}`);
                }}>Message</Button>
            </View>

            <View style={styles.card}>

                <Text style={styles.description}>{_job.description}</Text>

                <View style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {_job.skills.map((skill, index) => {
                        return (
                            <Chip key={index}>{skill}</Chip>
                        )
                    })}

                </View>
                <View style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 10,
                }}>
                    {_job.tags?.map((skill, index) => {
                        return (
                            <Chip key={index} style={{
                                backgroundColor: theme.colors.secondary,
                            }} >{skill}</Chip>
                        )
                    })}
                </View>

                <View style={styles.metaDetail}>
                    <View>
                        <Text style={styles.metaDetail}><Icon source={'account'} size={18} /> {_job.createdByName}</Text>
                        <Text><Icon source={'map-marker'} size={18} /> {_job.location}</Text>
                    </View>

                    <View>
                        <Text>{_job.price ? `$ ${_job.price}` : "Free"}</Text>
                        <Text><Icon source={'clock-time-three-outline'} size={18} /> {moment(_job.created_at).fromNow()}</Text>
                    </View>
      
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    subtitle: {
        fontSize: 12,
        marginTop: -20,
        left: 70,
    },
    card: {
        padding: 20,
        marginBottom: 20,
    },
    description: {
        fontSize: 15,
    },

    metaDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    metaText : {
        fontSize: 12,
    },

    action: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 20,
        marginTop: 20,
        gap : 10,
    },

    meta : {
        lineHeight: 20,
    },

    center: {
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