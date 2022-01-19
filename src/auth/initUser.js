import React, { useContext } from 'react'
import jwt from 'API/tokenServices'
import { userStore } from 'store/userStore'

// ** Api
import { logIn, signUp, getProfile, changePassword, updateProfile } from 'API/fetch'

// ** toast


export default function Inituser() {

    const userStoreData = useContext(userStore)

    const loginUser = async(payload, setError = () => {}) => {
        try {

            jwt.clearTokens()
            const res = await logIn(payload)
            const userData = res?.data?.user
            const _token = res?.data?.jwt
            if (!_token) {
                return false
            }
            const _obj = {jwt : _token, ...userData}
            jwt.setUserData(_obj)
            userStoreData.dispatch({
                type: 'initUser',
                payload: userData
            })
            
            return true

        } catch (ex) {
            console.log(ex?.response?.data, "Error")
            const error = ex?.response?.data?.error || {}
            setError(error)
            
            return false
        }
    }

    const signUpUser = async(payload, setError = () => {}) => {
        try {

            jwt.clearTokens()
            const res = await signUp(payload)
            const userData = res?.data?.user
            const _token = res?.data?.jwt
            if (!_token) {
                return false
            }
            const _obj = {jwt : _token, ...userData}
            jwt.setUserData(_obj)
            userStoreData.dispatch({
                type: 'initUser',
                payload: userData
            })
            
            return true

        } catch (ex) {
            console.log(ex?.response?.data, "Error")
            const error = ex?.response?.data?.error || {}
            setError(error)
            
            return false
        }
    }

    const fetchAndInitUser = async() => {
        try {

            const res = await getProfile()
            const userData = res.data.data
            if (!userData) {
                return 
            }
            userStoreData.dispatch({
                type: 'initUser',
                payload: userData
            })

        } catch (ex) {

        }
    }

    const isUserLoggedIn = () => {
        
        console.log(userStoreData?.state, "@is loggedin")
        if (userStoreData?.state?.username !== '' ) {
            return true
        }
        return false
        
    }

    const getUserData = () => {
        if (userStoreData?.state?.username ) {
            return userStoreData?.state
        }
        return {}
    }

    // const changeUserPassword = async(payload) => {

    //     try {

    //         const res = await changePassword(payload)
    //         if (res) {
               
    //             return res
    //         }
    //         return false

    //     } catch (ex) {
            
    //         return false
    //     }

    // }

    // const updateUserData = async(payload) => {

    //     try {

    //         const res = await updateProfile(payload)
    //         if (res) {
                
    //             fetchAndInitUser()
    //             return res
    //         }
    //         return false

    //     } catch (ex) {
            
    //         return false
    //     }

    // }
    

    return { isUserLoggedIn, getUserData, loginUser, signUpUser, fetchAndInitUser}
}