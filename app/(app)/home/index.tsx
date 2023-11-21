import React, { useEffect } from 'react'
import { Button, Chip, Drawer, FAB, Icon, IconButton, Menu, Searchbar } from 'react-native-paper'
import { View, StyleSheet, ToastAndroid, FlatList } from 'react-native'
import { Stack, router } from "expo-router"
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { theme } from '../../../style/theme'

import { getLocations, getPosts, postActions, postSelector } from '../../../store/context/postSlice'
import JobCard from './JobCard'
import MDrawer from './MDrawer'
import { supabase } from '../../../lib/supabase'
import { authActions } from '../../../store/context/authSlice'
type Props = {}

const Home = (props: Props) => {
    const dispatch = useAppDispatch();

    const jobs = useAppSelector(postSelector);
    const locations = useAppSelector(state => state.post.locationList);


    console.log("Jobs", locations);

    const [open, setOpen] = React.useState(false);

    // get posts
    useEffect(() => {
        dispatch(getPosts())
    }, [])

    // get profile data
    const user = useAppSelector((state) => state.auth.user);
    React.useEffect(() => {
        supabase.from('users').select('*').eq('id', user?.id).single().then(({ data, error }) => {
            dispatch(authActions.setProfile(data));
        });
    }, []);

    const searchQuery = useAppSelector(state => state.post.search);
    const onChangeSearch = (query: string) => {
        dispatch(postActions.setSearch(query));
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerTitle: "Home",
                headerLeft: (props) => {
                    return (
                        <>
                            <IconButton {...props} icon="menu" size={30} onPress={() => {
                                setOpen((prev) => !prev);
                            }} />
                        </>
                    )
                },

                headerRight: (props) => {
                    return (
                        <>
                            <LocationFilter />
                        </>
                    )
                }
            }} />

            <MDrawer open={open} setOpen={setOpen} anchor={() => <IconButton {...props} icon="menu" size={30} onPress={() => {
                setOpen((prev) => !prev);
            }} />} />

            <FilterChips />

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
