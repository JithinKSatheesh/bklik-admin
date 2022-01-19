import React from 'react'
import Icon from '@mui/material/Icon'

import {CommonTabs} from 'components/CommonTabs'

// import All from './All'
import Active from './Active'
import Expired from './Expired'
import History from './History'


// ** layout
import Layout from 'Layout'

export default function Users(props) {

    const _tabHead = [
        {
            id: 'active',
            label : 'Active Orders',
            // link : '/dashboard/users/active'
        },
        {
            id: 'expired',
            label : 'Expired Orders',
            // link : '/dashboard/users/all'
        },
        {
            id: 'history',
            label : 'Order History',
            // link : '/dashboard/users/all'
        },
        
    ]

    const _tabContent = [
        // {
        //     id : 'all',
        //     component : <All />
        // },
        {
            id : 'active',
            component : <Active />
        },
        {
            id : 'expired',
            component : <Expired />
        },
        {
            id : 'history',
            component : <History />
        },
       
    ]
    

    return (
        <Layout>
        <>
        <div className='px-4'>
            <div className="font-bold text-lg flex items-center">
               <Icon className='mr-2'> shoppingCart </Icon> Orders
            </div>
        </div>
        <div className="py-4">
            <CommonTabs  tabHead={_tabHead} tabContent={_tabContent} intialVal={'active'} />
        </div>
            
        </>
        </Layout>
    )
}
