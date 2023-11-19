import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const Page = () => {

    const loggedIn = false;

    if (loggedIn) {
        <Redirect href={'/(app)/home'} />
    }

    return (
        <Redirect href={'/login'} />
    )
}

export default Page
