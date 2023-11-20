import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { supabase } from '../lib/supabase'
import { authActions } from '../store/context/authSlice'

const Page = () => {
    const dispatch = useAppDispatch()
    React.useEffect(() => {
        console.log("Page Mounted");
        supabase.auth.getSession().then((res) => {
            if (res.error) {
                console.log("Session Error", res.error);
                return;
            }
            if(res.data.session){
                dispatch(authActions.setSession(res.data.session));
            }
        })
    }, [])
    

    const loggedIn = useAppSelector(state => state.auth.isAuth);

    console.log("Logged In", loggedIn);

    if (loggedIn) {
       return <Redirect href={'/(app)/home'} />
    } else {
        return <Redirect href={'/login'} />
    }
}

export default Page
