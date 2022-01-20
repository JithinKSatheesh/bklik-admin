import React from 'react'
import Icon from '@mui/material/Icon'

import {CommonTabs} from 'components/CommonTabs'

// import All from './All'
import Active from './Active'
import History from './History'



// ** layout
import Layout from 'Layout'

export default function Users(props) {

    const _tabHead = [
        {
            id: 'active',
            label : 'Active Deliveries',
            // link : '/dashboard/users/active'
        },
        {
            id: 'history',
            label : 'Deliveries History',
            // link : '/dashboard/users/active'
        },
       
        
    ]

    const _tabContent = [
 
        {
            id : 'active',
            component : <Active />
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
               <Icon className='mr-2'> local_shipping </Icon> Delivery
            </div>
        </div>
        <div className="py-4">
            <CommonTabs  tabHead={_tabHead} tabContent={_tabContent} intialVal={'active'} />
        </div>
            
        </>
        </Layout>
    )
}
