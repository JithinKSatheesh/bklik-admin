import React, { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';

// ** components
import Popup from 'components/Popup'
import { SavedAddressContainer } from './SavedAddressContainer';
import { SavedDeliveryContainer } from '../../Edit/SavedDeliveryContainer'
import { OrderHistoryTable } from './OrderHistoryTable';
import { EditOrderForm } from 'Pages/Edit/EditOrderForm';

// comontnets
import RenderTextField from 'components/RenderTextField';
import Renderinputs from 'components/RenderInputs'
import { SaveButton } from 'components/CommonIcons'

// ** hooks
import putDataHooks from 'hooks/putDataHooks'

// **API
import { getUserById, cancelOrders, createAddress, deleteAddress } from 'API/fetch'



export default function Index(props) {

    const { val, onClose, callback } = props

    const { updateUserData, updateOrderData, editAddressData, updateDeliveryData } = putDataHooks()

    const initialUserVal = {
        email: "",
        username: "",
        phone: "",

    }

    const initialAdressVal = {
        name: '',
        city: '',
        phone: '',
        address: '',
        is_default: '',
        info: '',
    }


    const initialOrderVal = {
        weeks: '',
        people: '',
        delivery_time: '',
        delivery_day: '',
        info: '',
        total_price: '',
        address : '',
        expiry_date: '',
        is_payment_confirmed: '',
        is_delivery_confirmed: ''

    }


    const initialDeliveryVal = {
        delivery_date: '',
        is_delivered: ''
    }

    // const [addressData, setaddressData] =useState([])
    const [userData, setuserData] = useState({})

    const [inputVal, setInputVal] = useState(initialUserVal)
    const [inputAddressVal, setInputAddressVal] = useState(initialAdressVal)
    const [inputNewAddressVal, setInputNewAddressVal] = useState(initialAdressVal)
    const [inputOrderVal, setInputOrderVal] = useState(initialOrderVal)
    const [inputDeliveryVal, setInputDeliveryVal] = useState(initialDeliveryVal)

    const _inputFields = [

        {
            name: "username",
            labelText: "Name",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "email",
            labelText: "Email",
            disabled: true,
            type: 'text'
        },
        {
            name: "phone",
            labelText: "Phone",
            type: 'text',
            wrapperClass: ''
        },


    ]

    const _inputFieldsAddress = [

        {
            name: "name",
            labelText: "Name",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "city",
            labelText: "city",
            type: 'text'
        },
        {
            name: "phone",
            labelText: "Phone",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "address",
            labelText: "address",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "is_default",
            labelText: "is default",
            type: 'select',
            options: [{ value: true, label: 'true' }, { value: false, label: 'false' }],
            wrapperClass: ''
        },

    ]

    const _inputFieldsOrder = [

        {
            name: "weeks",
            labelText: "weeks",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "people",
            labelText: "people",
            type: 'text'
        },
        {
            name: "delivery_time",
            labelText: "Delivery time",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "delivery_day",
            labelText: "Delivery day",
            type: 'select',
            options: [{ value: 'Sunday', label: 'Sunday' }, { value: 'Saturday', label: 'Saturday' }],
            wrapperClass: ''
        },
        {
            name: "info",
            labelText: "Info",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "total_price",
            labelText: "Total price",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "expiry_date",
            labelText: "Expiry date",
            type: 'date',
            wrapperClass: ''
        },
        {
            name: "address",
            labelText: "Address",
            type: 'select',
            options: userData?.addresses?.map(item => ({value : item.id, label : item.address})) ,
            wrapperClass: ''
        },


    ]

    const _inputFieldsDelivery = [
        {
            name: "delivery_date",
            labelText: "Delivery date",
            type: 'date',
            wrapperClass: ''
        },
    ]

    const [editCardId, setEditCardId] = useState(0)
    const [editDeliveryCardId, setEditDeliveryCardId] = useState(0)

    const [deleteCheck, setdeleteCheck] = useState('')

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setInputVal(prev => ({
            ...prev,
            ...e
        }))
    }

    const handleAddressChange = (e) => {
        setInputAddressVal(prev => ({
            ...prev,
            ...e
        }))
    }
    const handleNewAddressChange = (e) => {
        setInputNewAddressVal(prev => ({
            ...prev,
            ...e
        }))
    }

    const handleOrderChange = (e) => {
        setInputOrderVal(prev => ({
            ...prev,
            ...e
        }))
    }

    const handleDeliveryChange = (e) => {
        setInputDeliveryVal(prev => ({
            ...prev,
            ...e
        }))
    }

    const setAddressEdit = (item) => {
        setEditCardId(item.id)
        console.log(item)
        setInputAddressVal({
            name: item.name,
            phone: item.phone,
            address: item.address,
            city: item.city,
            info: item.info,
            is_default: false,
        })
    }

    const setDeliveryEdit = (item) => {
        setEditDeliveryCardId(item.id)
        setInputDeliveryVal({
            delivery_date: item.delivery_date,
            is_delivered: item.is_delivered
        })
    }

    const closeEdit = () => {
        setEditCardId(0)
        setInputAddressVal(initialAdressVal)
    }


    const closeDeliveryEdit = () => {
        setEditDeliveryCardId(0)
        setInputDeliveryVal(initialDeliveryVal)
    }


    const getUserData = async () => {
        try {
            const res = await getUserById(val.id)
            console.log(res.data.data)
            const item = res?.data?.data || {}
            const { email, username, phone } = item
            const orderval = item?.order ?? {}
            setuserData(item)
            setInputVal(prev => ({
                ...prev,
                email,
                username,
                phone
            }))
            setInputOrderVal(prev => ({
                ...orderval,
                address : orderval?.address?.id
            }))
        } catch (ex) {
            onClose()
        }
    }

    const updateUser = async () => {
        setLoading(true)
        const res = await updateUserData(val.id, inputVal)
        if (!res) {
            setInputVal(prev => ({
                ...prev,
                ...val
            }))
        } else {
            getUserData()
            callback()
        }
        // console.log(res)
        setLoading(false)
    }

    const updateAddress = async () => {
        setLoading(true)
        const payload = {
            ...inputAddressVal,
            default_address_user: inputAddressVal?.is_default ? val.id : ''
        }
        const res = await editAddressData(editCardId, payload)
        if (!res) {
            // setInputVal(prev => ({
            //     ...prev,
            //     ...val
            // })) 
        } else {
            getUserData()
            closeEdit()
            callback()
        }
        // console.log(res)
        setLoading(false)
    }

    const deleteAddressData = async () => {
        setLoading(true)
        const res = await deleteAddress(editCardId)
        if (!res) {
            // setInputDeliveryVal(prev => ({
            //     ...prev,
            //     ...val
            // })) 
        } else {
            getUserData()
            closeEdit()
            callback()
        }
        // console.log(res)
        setLoading(false)
    }

    const updateOrder = async () => {
        setLoading(true)
        const res = await updateOrderData(inputOrderVal.id, inputOrderVal)
        if (!res) {
            // setInputVal(prev => ({
            //     ...prev,
            //     ...val
            // }))
        } else {
            getUserData()
            callback()
        }
        // console.log(res)
        setLoading(false)
    }

    const updateDelivery = async () => {
        setLoading(true)
        const res = await updateDeliveryData(editDeliveryCardId, inputDeliveryVal)
        if (!res) {
            // setInputDeliveryVal(prev => ({
            //     ...prev,
            //     ...val
            // })) 
        } else {
            getUserData()
            callback()
        }
        // console.log(res)
        setLoading(false)
    }

    

    const callCancelOrder = async () => {
        setLoading(true)
        const res = await cancelOrders(inputOrderVal?.id)
        if (!res) {
            // setInputDeliveryVal(prev => ({
            //     ...prev,
            //     ...val
            // })) 
        } else {
            getUserData()
            callback()
        }
        // console.log(res)
        setLoading(false)
    }

    

    const createAddressData = async () => {
        setLoading(true)
        try {

            const res = await createAddress(val?.id, inputNewAddressVal)
            if (!res) {
                // setInputDeliveryVal(prev => ({
                //     ...prev,
                //     ...val
                // })) 
            } else {
                getUserData()
                callback()
                setInputNewAddressVal(initialAdressVal)
            }
        } catch (ex) {

        }
        // console.log(res)
        setLoading(false)
    }

    

    const checkExpiry = (expDate) => {
        const currentDate = new Date()
        const expiryDate = new Date(new Date(expDate).setHours(23, 59, 0, 0))

        return (currentDate > expiryDate)
    }


    useEffect(() => {
        getUserData()

    }, [])

    return (
        <>
            <Popup onClose={onClose}>
                <div className='font-bold'> {userData.username}  </div>
                <div className="py-4 flex flex-wrap">
                    <Renderinputs
                        inputFileds={_inputFields}
                        handleInputChange={handleInputChange}
                        inputVal={inputVal}
                        // loading={loading}
                        // valErrors={valErrors}
                        wrapperClass="my-2 w-2/4 px-2"
                    />
                </div>
                <div className='flex justify-start'>
                    <SaveButton loading={loading} callback={updateUser} label="Update user" />
                </div>
                <div className="py-2">
                    <Divider />
                </div>
                <div className="py-4">
                    <div className='font-bold'> Default address  </div>
                    <div className='text-sm'> {userData?.default_address?.name}  </div>
                    <div className='text-sm'> {userData?.default_address?.address}  </div>
                    <div className='text-sm'> {userData?.default_address?.phone}  </div>
                    <div className='text-sm'> {userData?.default_address?.info}  </div>
                </div>
                <div className="py-2">
                    <Divider />
                </div>
                <div className="py-4">
                    <div className='font-bold'> All address  </div>
                    {/* {addressData?.map(item => ( */}
                    <div className="flex flex-wrap">

                        <SavedAddressContainer
                            addressData={userData?.addresses ?? []}
                            editCardId={editCardId}
                            addressEditInputVal={inputAddressVal}
                            handleEditAddressChange={handleAddressChange}
                            setAddressEdit={setAddressEdit}
                            EditDataFunc={updateAddress}
                            loadingEdit={loading}
                            closeEdit={closeEdit}
                            deleteDataFunc={deleteAddressData}
                            _inputFieldsAddress={_inputFieldsAddress}
                        />
                    </div>
                    {/* ))} */}
                </div>
                {userData?.addresses?.length < 3 &&
                    <div className='bg-white shadow-xl rounded-xl p-4'>
                        <div className="flex flex-wrap ">
                            <Renderinputs
                                inputFileds={_inputFieldsAddress}
                                handleInputChange={handleNewAddressChange}
                                inputVal={inputNewAddressVal}
                                wrapperClass="my-2 w-2/4 px-2"
                                
                                />
                        </div>
                        <div className="py-2">
                            <SaveButton
                                callback={createAddressData}
                                label="Create Address"  />
                        </div>
                    </div>
                }
                <div className="py-2">
                    <Divider />
                </div>
                <div className="py-4">
                    <div className='font-bold'> Current Order  </div>
                </div>
                {checkExpiry(inputOrderVal?.expiry_date) ?
                    <Alert severity='error'> This order is already expired</Alert>
                    : null
                }
                <div>
                    {inputOrderVal?.id ?
                        <>
                            <EditOrderForm
                                inputVal={inputOrderVal}
                                handleInputChange={handleOrderChange}
                                _inputFields={_inputFieldsOrder}
                                loading={loading}
                                updateOrder={updateOrder}
                            />

                            <div className="py-2">
                                <Divider />
                            </div>
                            <div className="py-2">
                                <Alert severity='warning' > Type "cancel" and click delete button to cancel order </Alert>
                            </div>
                            <div className="flex">
                                <RenderTextField
                                    value={deleteCheck}
                                    handleChange={(e) => setdeleteCheck(e.target.value)}
                                    placeholder="Type 'cancel'"
                                    className="bg-white w-48" />
                                <SaveButton
                                    disabled={deleteCheck !== 'cancel'}
                                    callback={callCancelOrder}
                                    label="Cancel Order" color="error" />
                            </div>
                        </>
                        :
                        <div className='text-red-500'> No active order! </div>
                    }
                </div>


                <div className="py-2">
                    <Divider />
                </div>
                <div className="py-4">
                    <div className='font-bold'> Delivery Dates </div>
                </div>
                <div>
                    <div className="flex flex-wrap">
                        <SavedDeliveryContainer
                            deliveryData={userData?.order?.deliveries ?? []}
                            editCardId={editDeliveryCardId}
                            deliveryEditInputVal={inputDeliveryVal}
                            handleEditDeliveryChange={handleDeliveryChange}
                            setDeliveryEdit={setDeliveryEdit}
                            EditDataFunc={updateDelivery}
                            loadingEdit={loading}
                            closeEdit={closeDeliveryEdit}
                            // deleteDataFunc={deleteData}
                            _inputFieldsDelivery={_inputFieldsDelivery}
                        />
                    </div>

                </div>
                <div className="py-2">
                    <Divider />
                </div>
                <div className="py-4">
                    <div className='font-bold'> Order history  </div>
                </div>
                <OrderHistoryTable
                    order_histories={userData?.order_histories}
                />
            </Popup>
        </>
    )
}


