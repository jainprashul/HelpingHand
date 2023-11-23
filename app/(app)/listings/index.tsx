import React, { useEffect } from 'react'
import { Button, Chip, Drawer, FAB, Icon, IconButton, Menu, Searchbar, Text } from 'react-native-paper'
import { View, StyleSheet, ToastAndroid, FlatList } from 'react-native'
import { Stack, router } from "expo-router"
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { theme } from '../../../style/theme'

import { getLocations, getPosts, postActions, postSelector } from '../../../store/context/postSlice'

import { supabase } from '../../../lib/supabase'
import { authActions } from '../../../store/context/authSlice'
import JobCard from '../home/JobCard'
type Props = {}

const MyListings = (props: Props) => {
    const dispatch = useAppDispatch();

    const jobs = useAppSelector(postSelector);



    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "My Job Listings",
            }} />

            <FlatList
                data={jobs}
                renderItem={({ item }) => {
                    return (
                        <JobCard item={item}>
                            <View style={{
                                justifyContent : 'flex-end',
                                flexDirection : 'row',
                            }}>
                                <IconButton icon={'delete'} iconColor='#fff' style={{
                                backgroundColor: theme.colors.primary,
                                }} onPress={() => {
                                supabase.from('jobs').delete().eq('id', item.id).then(({ data, error }) => {
                                    if (error) {
                                        ToastAndroid.show(error.message, ToastAndroid.SHORT);
                                    } else {
                                        ToastAndroid.show("Job deleted", ToastAndroid.SHORT);
                                        dispatch(getPosts());
                                    }
                                });
                            }
                            }/>
                            </View>
                        </JobCard>
                    )
                }}
            />

            <FAB style={styles.fab} icon="plus" onPress={() => {
                router.push('/(app)/addPost');
            }} />
        </View>
    )
}

export default MyListings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: theme.colors.surface,
    },
    input: { marginBottom: 20, backgroundColor: theme.colors.background },
    search: {
        marginBottom: 10,
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
    },
});


function LocationFilter() {
    const dispatch = useAppDispatch();
    const filterOpen = useAppSelector(state => state.post.filterOpen);
    const locations = useAppSelector(state => state.post.locationList);
    function closeMenu() {
        dispatch(postActions.setFilterOpen(false));
    }
    return (
        <>
            <Menu
                visible={filterOpen}
                onDismiss={closeMenu}
                anchorPosition='bottom'
                anchor={<IconButton icon="map-marker" size={30} onPress={() => {
                    dispatch(postActions.setFilterOpen(true));
                }} />}>
                {locations.map((item) => {
                    return (
                        <Menu.Item onPress={() => {
                            dispatch(postActions.setFilterOpen(false));
                            dispatch(postActions.setFilterLocation(item));
                            dispatch(postActions.setFilterEnable(true));
                        }} title={item} />
                    )
                }
                )}
            </Menu>
        </>
    )
}

function FilterChips(){
    const filter = useAppSelector(state => state.post.filterEnable);
    const FilterLocation = useAppSelector(state => state.post.filterLocation);
    const dispatch = useAppDispatch();
    return (
        <View style={{
            flexDirection : 'row',
            justifyContent : 'flex-end',
            marginVertical : 5,
        }}>
           {
            filter && <Chip icon="map-marker" onPress={() => {
                dispatch(postActions.setFilterEnable(false));
              }} onClose={() => {   dispatch(postActions.setFilterEnable(false));  }}>{FilterLocation}</Chip>
           }

        </View>
    )
}
