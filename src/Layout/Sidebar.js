import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Icon from '@mui/material/Icon'

export default function Sidebar(props) {

    const location = useLocation().pathname
    
    const root = '/dashboard'

    const NavList = [
        // {
        //     icon : 'home',
        //     label : 'Home',
        //     link : `${root}/home`
        // },
        {
            icon : 'person',
            label : 'Users',
            link : `${root}/users`
        },
        {
            icon : 'shopping_cart',
            label : 'Orders',
            link : `${root}/orders`
        },
        {
            icon : 'local_shipping',
            label : 'Delivery ',
            link : `${root}/delivery`
        },
        {
            icon : 'settings',
            label : 'Config ',
            link : `${root}/config`
        },
    ]
    

    return (
        <>
        {/* {console.log(location)} */}
           {NavList.map(item =>  <div key={item.label}  
            className={`px-2 py-4  my-2 cursor-pointer hover:bg-white ${location === item.link ? 'bg-orange text-white' : null} `}>
            <Link to={item.link} className='flex items-center  '>
               <span className="mr-2">
                   <Icon> {item.icon} </Icon>
               </span>
               {item.label}
            </Link>
           </div>)} 
        
        </>
    )
}
