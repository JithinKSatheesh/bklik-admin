import React, { useEffect, useState } from 'react'
import Icon from '@mui/material/Icon'
import Alert from '@mui/material/Alert'

import {CommonTabs} from 'components/CommonTabs'

import All from './All'
import Active from './Active'

// API
import {userCount} from 'API/fetch'

// ** layout
import Layout from 'Layout'

export default function Users(props) {

    const [count, setCount] = useState(0)

    const _tabHead = [
        {
            id: 'active',
            label : 'Users',
            // link : '/dashboard/users/active'
        },
        // {
        //     id: 'all',
        //     label : 'All Users',
        //     // link : '/dashboard/users/all'
        // },
        
    ]

    const _tabContent = [
        {
            id : 'all',
            component : <All />
        },
        {
            id : 'active',
            component : <Active />
        },
       
    ]

    const fetchUserCount = async() => {
        try {
            const res = await userCount()
            // console.log(res.data)
            setCount(res.data)
        } catch(ex) {

        }
    }

    useEffect(() => {
        fetchUserCount()
    }, [])
    

    return (
        <Layout>
        <>
        <div className='px-4'>
            <div className="font-bold text-lg flex items-center">
               <Icon className='mr-2'> person </Icon> USERS (Total : {count})
            </div>
        </div>
        <div className="py-4">
            <CommonTabs  tabHead={_tabHead} tabContent={_tabContent} intialVal={'active'} />
        </div>
            
        </>
        </Layout>
    )
}
