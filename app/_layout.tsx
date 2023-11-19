import React, { useState } from 'react'
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { PersistGate } from "redux-persist/integration/react";
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
                <PersistGate loading={<Loading />} persistor={persistor} />
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