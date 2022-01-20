import axios from "axios";
import jwt from './tokenServices'

axios.interceptors.request.use(
    req => {
      const accessToken = jwt.getUserData()?.jwt
      const tokenType = 'Bearer'
      if (accessToken) {
        req.headers.Authorization = `${tokenType} ${accessToken}`
      }
      return req
    },
    error => Promise.reject(error)
  )


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:1337/api/'

// ---------------------------------------
//  User
// ---------------------------------------

export function logIn  (payload) {
    return  axios.post(`${BASE_URL}auth/local`, payload)
}

export function signUp  (payload) {
    return  axios.post(`${BASE_URL}auth/local/register`, payload)
}


export function getProfile  (payload) {
    return  axios.get(`${BASE_URL}user/profile`, payload)
}


export function getAllUsers (query) {
    return  axios.get(`${BASE_URL}admin/user/all?${query}`)
}

export function getUserById (id) {
    return  axios.get(`${BASE_URL}admin/user/one/${id}`)
}

// ---------------------------------------
//  USERS
// ---------------------------------------

export function updateUserProfile  (id, payload) {
    return  axios.post(`${BASE_URL}admin/user/profile/${id}`, payload)
}

export function resetPassword  (payload) {
    return  axios.post(`${BASE_URL}auth/forgot-password`, payload)
}

export function changePassword  (payload) {
    return  axios.post(`${BASE_URL}user/change-password`, payload)
}
// ---------------------------------------
//  Address
// ---------------------------------------

export function getAddress () {
    return  axios.get(`${BASE_URL}address/me`)
}

export function createAddress  (id, payload) {
    return  axios.post(`${BASE_URL}admin/address/${id}`, payload)
}

export function editAddress  (id, payload) {
  return  axios.put(`${BASE_URL}addresses/${id}`, { data : payload})
}

export function deleteAddress  (id) {
  return  axios.delete(`${BASE_URL}addresses/${id}`)
}

// ---------------------------------------
// Orders
// ---------------------------------------

export function getOrders (query) {
  return  axios.get(`${BASE_URL}admin/orders/all?${query}`)
}

export function createOrders (payload) {
  return  axios.post(`${BASE_URL}orders`, payload)
}

export function updateOrders (id, payload) {
  return  axios.put(`${BASE_URL}orders/${id}`, { data : payload})
}

export function cancelOrders (id) {
  return  axios.get(`${BASE_URL}admin/orders/cancel/${id}`)
}

export function confirmOrderEmail (id) {
  return  axios.get(`${BASE_URL}admin/orders/mail/confirm/${id}`)
}

// ---------------------------------------
// delivery
// ---------------------------------------

export function updateDelivery (id, payload) {
  return  axios.put(`${BASE_URL}deliveries/${id}`, { data : payload})
}


// ---------------------------------------
// config
// ---------------------------------------

export function getConfig () {
  return  axios.get(`${BASE_URL}config`)
}

export function editConfig () {
  return  axios.put(`${BASE_URL}config`)
}