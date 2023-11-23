import React, { useState } from 'react'
import { Provider } from "react-redux";
import {  store } from "../store";
import Loading from "../components/Loading";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../style/theme';
import { StatusBar } from 'expo-status-bar';
import {  Slot } from 'expo-router';

export default function Layout() {
    return (
        <>
            <Provider store={store}>
                <Shell />
            </Provider>
        </>
    );
}


function Shell() {
    const [loading, setLoading] = useState(false)


    if (loading) {
        return <Loading />
    }

    return <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <Slot/>
      </PaperProvider>
    </SafeAreaProvider>
}