import React, { useEffect } from 'react'
import { Button, FAB, Searchbar } from 'react-native-paper'
import { View, StyleSheet, ToastAndroid, FlatList } from 'react-native'
import { Stack, router } from "expo-router"
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { theme } from '../../../style/theme'

import { getPosts, postActions, postSelector } from '../../../store/context/postSlice'
import JobCard from './JobCard'
type Props = {}





const Home = (props: Props) => {
    const dispatch = useAppDispatch();

    const jobs = useAppSelector(postSelector);

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    const searchQuery = useAppSelector(state => state.post.search);
    const onChangeSearch = (query: string) => {
        dispatch(postActions.setSearch(query));
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "Home",
            }} />

            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.search}
            />

            <FlatList
                data={jobs}
                renderItem={({ item }) => {
                    return (
                        <JobCard item={item}></JobCard>
                    )
                }}
            />

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
    input: { marginBottom: 20, backgroundColor: theme.colors.background },
    search : {
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
    },
});
