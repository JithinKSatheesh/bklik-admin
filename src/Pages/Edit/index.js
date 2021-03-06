import React, { useEffect, useState } from 'react'
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon'
import * as qs from 'qs'

// MUi
import Alert from '@mui/material/Alert'

// ** components
import Popup from 'components/Popup'
import { SavedDeliveryContainer } from './SavedDeliveryContainer';

// ** hooks
import putDataHooks from 'hooks/putDataHooks'

// ** API
import { getOrdersById } from 'API/fetch'


import { EditOrderForm } from './EditOrderForm';

export default function Index(props) {

    const { val, onClose, callback } = props

    const { updateOrderData, updateDeliveryData } = putDataHooks()

    const _inputFields = [

        {
            name: "recipe_per_week",
            labelText: "recipe_per_week",
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
            name: "delivery_time_details",
            labelText: "Delivery time details",
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
            name: "info",
            labelText: "Info, food type..",
            type: 'text',
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

    const initialOrderVal = {
        recipe_per_week : '',
        weeks: '',
        people: '',
        delivery_time: '',
        delivery_day: '',
        delivery_time_details : '',
        info: '',
        total_price: '',
        expiry_date: '',
        is_payment_confirmed: '',
        is_delivery_confirmed: ''

    }

    const [orderData, setOrderData] = useState({})
    const [inputVal, setInputVal] = useState(initialOrderVal)
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setInputVal(prev => ({
            ...prev,
            ...e
        }))
    }


    const initialDeliveryVal = {
        delivery_date: '',
        is_delivered: ''
    }

    const [inputDeliveryVal, setInputDeliveryVal] = useState(initialDeliveryVal)
    const [editCardId, setEditCardId] = useState(0)

    const handleDeliveryChange = (e) => {
        setInputDeliveryVal(prev => ({
            ...prev,
            ...e
        }))
    }

    const setDeliveryEdit = (item) => {
        setEditCardId(item.id)
        console.log(item)
        setInputDeliveryVal({
            delivery_date: item.delivery_date,
            is_delivered: item.is_delivered
        })
    }

    const closeEdit = () => {
        setEditCardId(0)
        setInputDeliveryVal(initialDeliveryVal)
    }

    const checkExpiry = (expDate) => {
        const currentDate = new Date()
        const expiryDate = new Date(new Date(expDate).setHours(23, 59, 0, 0))

        return (currentDate > expiryDate)
    }

    const query = qs.stringify(
        {
            // populate: ['user_details', 'address', 'deliveries']
            // populate: ['deliveries']
        }, 
        { encodeValuesOnly: true, }
    );

    const getOrderData = async () => {
        setLoading(true)
        try {
            const res = await getOrdersById(val.id, query)
            // console.log(res?.data?.data?.attributes)
            const items = res?.data?.data || {}
            const address = res?.data?.data?.address || {}
            const deliveries = res?.data?.data?.deliveries || []
            const user_details = res?.data?.data?.user_details || {}
            

            console.log(items)

            setInputVal(prev => ({
                ...prev,
                ...items,
                address : ''
            }))
            setOrderData(prev => ({
                ...prev,
                ...items,
                address,
                deliveries,
                user_details
            }))
            
        } catch (ex) {
            onClose()
        }
        setLoading(false)
    }



    const updateOrder = async () => {
        setLoading(true)
        const res = await updateOrderData(val.id, inputVal)
        if (!res) {
            setInputVal(prev => ({
                ...prev,
                ...val
            }))
        } else {
            getOrderData()
            callback()
        }
        // console.log(res)
        setLoading(false)
    }

    const updateDelivery = async (allow_mail) => {
        setLoading(true)
        const res = await updateDeliveryData(editCardId, inputDeliveryVal, val.id, allow_mail)
        if (!res) {
            // setInputDeliveryVal(prev => ({
            //     ...prev,
            //     ...val
            // })) 
        } else {
            getOrderData()
            closeEdit()
            callback()
        }
        // console.log(res)
        setLoading(false)
    }



    useEffect(() => {
        getOrderData()
        // setInputVal(prev => ({
        //     ...prev,
        //     ...val
        // }))
    }, [])

    return (
        <>
            <Popup onClose={onClose} loading={loading}>
                <div className="">
                    {orderData?.is_canceled && <Alert severity='error'> This is a cancelled order  </Alert>}
                   
                    {checkExpiry(orderData?.expiry_date) ?
                        <Alert severity='error'> This order is already expired</Alert>
                        : null
                    }
                    <div className="py-2 font-bold text-right px-4">
                        #: {(`${orderData?.createdAt}`).substring(0, 10)}
                    </div>
                    <div className="py-3 w-full">
                        <div className='font-bold'> {orderData?.user_details?.username}  </div>
                        <div className='text-slate-500'> {orderData?.user_details?.email}  </div>
                        <div className='text-slate-500 text-xs'> {orderData?.user_details?.phone}  </div>
                    </div>
                    <Divider />
                    <div className="py-4 w-full">
                        <div className='font-bold'>  Address  </div>
                        <div className='text-sm'> {orderData?.address?.name}  </div>
                        <div className='text-sm'> {orderData?.address?.address}  </div>
                        <div className='text-sm'> {orderData?.address?.phone}  </div>
                        <div className='text-sm'> {orderData?.address?.info}  </div>
                    </div>
                </div>

                <div className="py-2">
                    <Divider />
                </div>
                <EditOrderForm
                    inputVal={inputVal}
                    handleInputChange={handleInputChange}
                    _inputFields={_inputFields}
                    loading={loading}
                    updateOrder={updateOrder}  
                />
                <div className="py-2">
                    <Divider />
                </div>
                <div className="py-4">
                    <div className='font-bold'> Payment Details </div>
                    <div>
                        {orderData?.payment_mode}
                    </div>
                    <div>
                        {/* {console.log(val)} */}
                        {orderData?.bring_nfc && <Alert severity='warning' className=''>
                            Customer requested NFC device
                        </Alert>}
                    </div>
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
                            deliveryData={orderData?.deliveries ?? []}
                            editCardId={editCardId}
                            deliveryEditInputVal={inputDeliveryVal}
                            handleEditDeliveryChange={handleDeliveryChange}
                            setDeliveryEdit={setDeliveryEdit}
                            EditDataFunc={updateDelivery}
                            loadingEdit={loading}
                            closeEdit={closeEdit}
                            // deleteDataFunc={deleteData}
                            _inputFieldsDelivery={_inputFieldsDelivery}
                        />
                    </div>

                </div>
            </Popup>
        </>
    )
}


