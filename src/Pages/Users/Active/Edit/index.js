import React, {useEffect, useState} from 'react'
import Divider from '@mui/material/Divider';

// ** components
import Popup from 'components/Popup'
import Renderinputs from 'components/RenderInputs'
import { SavedAddressContainer } from './SavedAddressContainer';

// ** hooks
import putDataHooks from 'hooks/putDataHooks'


import {SaveButton } from 'components/CommonIcons'

export default function Index(props) {
    
    const {val, onClose, callback} = props

    const { updateUserData, editAddressData } = putDataHooks()

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
            disabled : true,
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
            options : [{value : true, label : 'true'}, {value : false, label : 'false'}],
            wrapperClass: ''
        },
       
        
    ]

    const initialUserVal = {
        email: "",
        username: "",
        phone: "",

    }

    const initialAdressVal = {
        name : '',
        city : '',
        phone : '',
        address : '',
        is_default : '',
        info : '',
    }

    const addressData = val?.addresses ?? []

    const [inputVal, setInputVal] = useState(initialUserVal)
    const [inputAddressVal, setInputAddressVal] = useState(initialAdressVal)
    const [editCardId, setEditCardId] = useState(0)
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

    const setAddressEdit = (item) => {
        setEditCardId(item.id)
        console.log(item)
        setInputAddressVal({
            name: item.name,
            phone: item.phone,
            address: item.address,
            city: item.city,
            info: item.info,
            is_default : false,
        })
    }

    const closeEdit = () => {
        setEditCardId(0)
        setInputAddressVal(initialAdressVal)
    }

    const updateUser = async() => {
        setLoading(true)
        const res =  await updateUserData(val.id, inputVal)
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

    const updateAddress = async() => {
        setLoading(true)
        const payload = {
            ...inputAddressVal,
            default_address_user : inputAddressVal?.is_default ? val.id : ''
        }
        const res =  await editAddressData(editCardId, payload)
        if (!res) {
            // setInputVal(prev => ({
            //     ...prev,
            //     ...val
            // })) 
        } else {
            closeEdit()
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
            <div className='font-bold'> {val.username}  </div>
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
            <div className='flex justify-end'>
                <SaveButton loading={loading}  callback={updateUser} label="Update user" />
            </div>
            <div className="py-2">
               <Divider />
            </div>
            <div className="py-4">
                <div className='font-bold'> Default address  </div>
                <div className='text-sm'> {val?.default_address?.name}  </div>
                <div className='text-sm'> {val?.default_address?.address}  </div>
                <div className='text-sm'> {val?.default_address?.phone}  </div>
                <div className='text-sm'> {val?.default_address?.info}  </div>
            </div>
            <div className="py-2">
               <Divider />
            </div>
            <div className="py-4">
                <div className='font-bold'> All address  </div>
                {/* {addressData?.map(item => ( */}
                <div className="flex flex-wrap">

                    <SavedAddressContainer
                        addressData={addressData}
                        editCardId={editCardId}
                        addressEditInputVal={inputAddressVal}
                        handleEditAddressChange={handleAddressChange}
                        setAddressEdit={setAddressEdit}
                        EditDataFunc={updateAddress}
                        loadingEdit={loading}
                        closeEdit={closeEdit}
                        // deleteDataFunc={deleteData}
                        _inputFieldsAddress={_inputFieldsAddress}
                        />
                </div>
                {/* ))} */}
            </div>
            <div className="py-2">
               <Divider />
            </div>
            <div className="py-4">
                <div className='font-bold'> All Orders  </div>

            </div>
        </Popup>
        </>
    )
}
