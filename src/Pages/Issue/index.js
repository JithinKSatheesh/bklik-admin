import React from 'react'
import Icon from '@mui/material/Icon'

import {CommonTabs} from 'components/CommonTabs'

import Active from './Active'


// ** layout
import Layout from 'Layout'

export default function Users(props) {

    const _tabHead = [
        {
            id: 'issue',
            label : 'Issue',
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
            id : 'issue',
            component : <Active />
        },
        
       
    ]
    

    return (
        <Layout>
        <>
        <div className='px-4'>
            <div className="font-bold text-lg flex items-center">
               <Icon className='mr-2'> person </Icon> Reported issues
            </div>
        </div>
        <div className="py-4">
            <CommonTabs  tabHead={_tabHead} tabContent={_tabContent} intialVal={'issue'} />
        </div>
            
        </>
        </Layout>
    )
}
