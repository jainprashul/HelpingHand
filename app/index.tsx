import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { supabase } from '../lib/supabase'
import { authActions } from '../store/context/authSlice'
import Loading from '../components/Loading'

const Page = () => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = React.useState(true);
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
        }).finally(() => {
            setLoading(false);
        });

        supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth State Change", event, session);
          
        });
    }, [])
    

    const loggedIn = useAppSelector(state => state.auth.isAuth);

    console.log("Logged In", loggedIn);

    if (loading) {
        return <Loading />
    }else {
        if (loggedIn) {
           return <Redirect href={'/(app)/home'} />
        } else {
            return <Redirect href={'/login'} />
        }

    }

}

export default Page
