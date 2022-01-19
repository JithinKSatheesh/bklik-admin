import React from 'react'

// ** API
import { 
        createAddress , editAddress, deleteAddress, 
        updateUserProfile, updateOrders, updateDelivery
    } from 'API/fetch'

import {clean} from 'services/utils'

// ** hooks
// import fetchhooks from './fetchDataInitHooks'

// **toast
import { throwToast } from 'components/ThrowToast'

export default function Putdatahooks(props) {

    // const { initAddressData } = fetchhooks()
    
    const createAddressData = async(payload) => {

        try {

            const res = await createAddress(payload)
            if (res?.data?.data) {
                // initAddressData()
                return res.data.data
            }
            return false

        } catch (ex) {
            
            return false
        }
    }

    const editAddressData = async(id, payload) => {

        const _payload = clean(payload)

        console.log(_payload)

        try {

            const res = await editAddress(id, _payload)
            if (res?.data?.data) {
                throwToast.success("Updated")
                return res.data.data
            }
            return false

        } catch (ex) {
            throwToast.error("Error")
            return false
        }
    }
    
    const deleteAddressData = async(id) => {

        try {

            const res = await deleteAddress(id)
            if (res?.data?.data) {
                // initAddressData()
                return res.data.data
            }
            return false

        } catch (ex) {
            
            return false
        }
    }

    const updateUserData = async(id, payload) => {

        const {username, phone } = payload
        const _payload = clean({username, phone })

        try {

            const res = await updateUserProfile(id, _payload)
            if (res?.data?.data) {
                // initAddressData()
                throwToast.success("Updated")
                return res.data.data
            }
            return false

        } catch (ex) {
            throwToast.error("Error")
            return false
        }
    }
    const updateOrderData = async(id, payload) => {

        const {
            weeks, 
            people, 
            delivery_time, 
            info, 
            total_price, 
            expiry_date, 
            is_payment_confirmed, 
            is_delivery_confirmed 
        } = payload
        
        const _payload = clean({ 
            weeks, 
            people, 
            delivery_time, 
            info, 
            total_price, 
            expiry_date, 
            is_payment_confirmed, 
            is_delivery_confirmed 
        })

        try {

            const res = await updateOrders(id, _payload)
            if (res?.data?.data) {
                // initAddressData()
                throwToast.success("Updated")
                return res.data.data
            }
            return false

        } catch (ex) {
            throwToast.error("Error")
            return false
        }
    }
    const updateDeliveryData = async(id, payload) => {

        const {
            delivery_date,
            is_delivered,
        } = payload
        
        const _payload = clean({ 
            delivery_date,
            is_delivered,
        })

        try {

            const res = await updateDelivery(id, _payload)
            if (res?.data?.data) {
                // initAddressData()
                throwToast.success("Updated")
                return res.data.data
            }
            return false

        } catch (ex) {
            throwToast.error("Error")
            return false
        }
    }






    return {createAddressData, editAddressData, deleteAddressData, updateUserData, updateOrderData, updateDeliveryData}
}
