import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import jwt from 'API/tokenServices'
import { userStore } from 'store/userStore'
import { throwToast } from 'components/ThrowToast'

// ** Api
import { logIn, signUp, getProfile, changePassword, updateProfile } from 'API/fetch'

// ** toast


export default function Inituser() {

    const userStoreData = useContext(userStore)
    const history = useHistory()

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
            // console.log(ex?.response?.data, "Error")
            throwToast.error("Auth failed")
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
            const userData = res?.data?.data
            if (!userData) {
                return  false
            }
            userStoreData.dispatch({
                type: 'initUser',
                payload: userData
            })
            return true

        } catch (ex) {
            return  false
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

    const logOutUser = () => {
        jwt.clearTokens()
        userStoreData.dispatch({
            type: 'logOut',
            payload: {}
        })
        history.push('/login')
    }
    

    return { isUserLoggedIn, getUserData, loginUser, signUpUser, fetchAndInitUser, logOutUser}
}
