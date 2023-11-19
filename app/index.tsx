import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { useAppSelector } from '../store/hooks'

const Page = () => {

    const loggedIn = useAppSelector(state => state.auth.isAuth);

    if (loggedIn) {
       return <Redirect href={'/(app)/home'} />
    }

    return (
        <Redirect href={'/login'} />
    )
}

export default Page
