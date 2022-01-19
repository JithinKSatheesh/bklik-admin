import React, {useEffect, useState} from 'react'
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon'

// ** components
import Popup from 'components/Popup'
import Renderinputs from 'components/RenderInputs'
import { SavedDeliveryContainer } from './SavedDeliveryContainer';

// ** hooks
import putDataHooks from 'hooks/putDataHooks'


import {SaveButton } from 'components/CommonIcons'
import Renderswitch from 'components/RenderSwitch';

export default function Index(props) {
    
    const {val, onClose, callback} = props

    const {  updateOrderData, updateDeliveryData  } = putDataHooks()

    const _inputFields = [
       
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
            options : [{value : 'Sunday', label : 'Sunday'}, {value : 'Saturday', label : 'Saturday'}],
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
        weeks : '',
        people : '',
        delivery_time : '',
        delivery_day : '',
        info : '',
        total_price : '',
        expiry_date : '',
        is_payment_confirmed : '',
        is_delivery_confirmed : ''

    }

    const [inputVal, setInputVal] = useState(initialOrderVal)
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setInputVal(prev => ({
            ...prev,
            ...e
        }))
    }


    const initialDeliveryVal = {
        delivery_date : '',
        is_delivered : ''
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
            delivery_date : item.delivery_date,
            is_delivered : item.is_delivered
        })
    }

    const closeEdit = () => {
        setEditCardId(0)
        setInputDeliveryVal(initialDeliveryVal)
    }

 

    const updateOrder = async() => {
        setLoading(true)
        const res =  await updateOrderData(val.id, inputVal)
        if (!res) {
            setInputVal(prev => ({
                ...prev,
                ...val
            })) 
        } else {
            callback()
        }
        // console.log(res)
        setLoading(false)
    }

    const updateDelivery = async() => {
        setLoading(true)
        const res =  await updateDeliveryData(editCardId, inputDeliveryVal)
        if (!res) {
            // setInputDeliveryVal(prev => ({
            //     ...prev,
            //     ...val
            // })) 
        } else {
            callback()
        }
        // console.log(res)
        setLoading(false)
    }



    useEffect(() => {
        setInputVal(prev => ({
            ...prev,
            ...val
        })) 
    }, [])

    return (
        <>
        <Popup onClose={onClose}>
            <div className="">
                <div className="py-3 w-full">
                    <div className='font-bold'> {val?.user_details?.username}  </div>
                    <div className='text-slate-500'> {val?.user_details?.email}  </div>
                    <div className='text-slate-500 text-xs'> {val?.user_details?.phone}  </div>
                </div>
               <Divider />
                <div className="py-4 w-full">
                    <div className='font-bold'>  Address  </div>
                    <div className='text-sm'> {val?.address?.name}  </div>
                    <div className='text-sm'> {val?.address?.address}  </div>
                    <div className='text-sm'> {val?.address?.phone}  </div>
                    <div className='text-sm'> {val?.address?.info}  </div>
                </div>
            </div>
            
            <div className="py-2">
               <Divider />
            </div>
            <div className="py-4 flex flex-wrap">
                <div className='w-full py-2'>
                    <Renderswitch 
                        value={inputVal?.is_delivery_confirmed} 
                        handleChange={(e) => handleInputChange({'is_delivery_confirmed' : e.target.checked})}
                        labelText="Is delivery confirmed"
                        />
                </div>
                <div className='w-full py-2'>
                    <Renderswitch 
                        value={inputVal?.is_payment_confirmed} 
                        handleChange={(e) => handleInputChange({'is_payment_confirmed' : e.target.checked})}
                        labelText="Is Payment confirmed"
                        />
                </div>
                <Renderinputs
                    inputFileds={_inputFields}
                    handleInputChange={handleInputChange}
                    inputVal={inputVal}
                    // loading={loading}
                    // valErrors={valErrors}
                    wrapperClass="my-2 w-2/4 px-2"
                />
            </div>
            <div className='flex justify-end'>
                <SaveButton loading={loading}  callback={updateOrder} label="Update Order" />
            </div>
            <div className="py-2">
               <Divider />
            </div>
            <div className="py-4">
                <div className='font-bold'> Payment Details </div>
                <div>
                    {val?.payment_mode}
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
                        deliveryData={val?.deliveries ?? []}
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
                <div className="flex flex-wrap">
                    
                    {/* {val?.deliveries?.map(item => (
                        <div className="p-2 shadow-xl mx-2 rounded-lg bg-white  text-center flex items-center cursor-pointer">
                            {item?.is_delivered ? 
                                <Icon className='text-green-800'> check </Icon> 
                                : 
                                <Icon className='text-red-500'> close </Icon>}
                            {item?.delivery_date}
                        </div>
                    ))}  */}
                </div>
            </div>
        </Popup>
        </>
    )
}
