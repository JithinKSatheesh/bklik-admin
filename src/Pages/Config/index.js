import React, { useState, useEffect } from 'react'

import Icon from '@mui/material/Icon'
import Alert from '@mui/material/Alert';

import Renderinputs from 'components/RenderInputs'
import {  SaveButton} from 'components/CommonIcons';
import {throwToast} from 'components/ThrowToast'

// ** layout
import Layout from 'Layout'

// ** API
import { editConfig, getConfig} from 'API/fetch'

export default function Index(props) {

    const _inputFieldsConfig = [
        {
            name: "price",
            labelText: "Price",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "max_weeks",
            labelText: "Max weeks",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "max_people",
            labelText: "Max People",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "delivery_time_range",
            labelText: "delivery_time_range JSON",
            type: 'textarea',
            wrapperClass: ''
        },
    ]

    const initialConfigVal = {
        id : '',
        price : '',
        max_weeks : '',
        max_people : '',
        delivery_time_range : ''
    }
    
    const [inputVal, setInputVal] = useState(initialConfigVal)
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setInputVal(prev => ({
            ...prev,
            ...e
        }))
    }

    const fetchConfigData = async () => {
        setLoading(true)
        try {
            const res = await getConfig()
            const items = res?.data?.data ?? {}
            setInputVal(prev => ({
                ...prev,
                ...items,
                delivery_time_range : items?.delivery_time_range ? JSON.stringify(items.delivery_time_range) : ''
            }))
            
            // setTableData(items)

        } catch (ex) {
            
        }
        setLoading(false)
    }

    const editConfigData = async () => {
        setLoading(true)
        const _payload = {...inputVal, delivery_time_range : JSON.parse(inputVal.delivery_time_range)}
        try {
            const res = await editConfig(inputVal.id, _payload)
            fetchConfigData()
            throwToast.success("Updated")

        } catch (ex) {
            throwToast.error("Error")   
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchConfigData()
    }, [])


    return (
        <>
        <Layout>
        <div className='p-4'>
            <div className="font-bold text-lg flex items-center">
               <Icon className='mr-2'> settings </Icon> Config
            </div>
        </div>
        <div className="p-4 w-1/2">
            <Alert severity='error' > Edit with caution - This page data will directly affect main website </Alert>
        </div>

        <div className="p-4">
            <Renderinputs
                inputFileds={_inputFieldsConfig}
                handleInputChange={handleInputChange}
                inputVal={inputVal}
                loading={loading}
                // valErrors={valErrors}
                wrapperClass="my-2 w-2/4 "
            />
        </div>
        <div className="p-4">
            <SaveButton callback={editConfigData} loading={loading} label="Update" />
        </div>

        </Layout>
        </>
    )
}
