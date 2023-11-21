import React from 'react'
import { Button, Card, Text, TextInput } from 'react-native-paper'
import { StyleSheet, ScrollView, ToastAndroid } from 'react-native'

import { router, Stack } from "expo-router"
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import SelectDropdown from 'react-native-select-dropdown'
import { skillList } from '../../../constants'
import { theme } from '../../../style/theme'

import { Job } from '../../../types/job'
import { jobService } from '../../../lib/services/jobService'
import { getPosts } from '../../../store/context/postSlice'


type Props = {}

const CreateProfile = (props: Props) => {
    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.auth.profile)
    const current = useAppSelector(state => state.user.data)

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [price, setPrice] = React.useState<number>();

    const [skills, setSkills] = React.useState<string[]>([]);
    const [tags, setTags] = React.useState<string[]>([]);

    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState('');


    const _onSave = async () => {
        try {
            const post: Job = {
                
                timestamp: Date.now(),
                title,
                description,
                location: user?.city ?? "",
                createdBy: user?.id ?? "",
                createdByName: user?.name ?? "",
                contact: user?.phone ?? "",
                
            
                price: price ?? 0,
                skills,
                tags,
            }

        
            jobService.add(post).then((res) => {
                dispatch(getPosts());
                router.back();
                ToastAndroid.show("Post Created", ToastAndroid.SHORT);
            }).catch((err) => {
                ToastAndroid.show("Error Creating Post", ToastAndroid.SHORT);
            });


        } catch (error: any) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "Post a new Job",
            }} />

            <Card style={styles.card}>
                {/* <Text variant='titleMedium' style={{ textAlign: 'center', margin: 20, }}>
                    Create new Post
                </Text> */}
                <Card.Content>
                    <TextInput
                        label={'Title'}
                        placeholder='Post Title'
                        style={styles.input}
                        value={title}

                        returnKeyType='next'
                        onChangeText={text => { setTitle(text); }}
                    />
                    <TextInput
                        label={'Description'}
                        placeholder="Please describe your post"
                        style={styles.input}
                        value={description}
                        multiline
                        numberOfLines={5}
                        onChangeText={text => { setDescription(text); }}
                    />


                    <TextInput
                        label={'Pricing'}
                        placeholder='Pricing'
                        style={styles.input}
                        value={price as any}
                        keyboardType='numeric'
                        onChangeText={text => { setPrice(+text);}}
                    />
                    <TextInput
                        label={'Tags'}
                        placeholder='Tags'
                        style={styles.input}
                        value={tags.join(',')}
                        onChangeText={text => { setTags(text.split(',')); }}
                    />
                    {/* <TextInput
                        label={'City'}
                        placeholder='City'
                        style={styles.input}
                        value={city}
                        onChangeText={text => { setCity(text);}}
                    /> */}


                    <Text style={{ textAlign: 'left', }}>
                        Select Skills
                    </Text>
                    <SelectDropdown data={skillList}
                        buttonStyle={styles.dropdownBtn}
                        search
                        onSelect={(selectedItem, index) => {
                            setSkills([selectedItem]);
                        }}
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
        backgroundColor: theme.colors.surface,
    },
    card: {
        marginBottom: 20,
    },
    input: { marginBottom: 20, backgroundColor: theme.colors.background },
    dropdownBtn: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#444",
        marginVertical: 20,

    }
});
