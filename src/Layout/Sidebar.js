import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Icon from '@mui/material/Icon'

export default function Sidebar(props) {
    
    const root = '/dashboard'

    const NavList = [
        {
            icon : 'home',
            label : 'Home',
            link : `${root}/home`
        },
        {
            icon : 'person',
            label : 'Users',
            link : `${root}/users`
        },
        {
            icon : 'shoppingCart',
            label : 'Orders',
            link : `${root}/orders`
        },
    ]
    

    return (
        <>
        {/* <Paper elevation={2} className='py-2' > */}
           {NavList.map(item =>  <div key={item.label}  
            className="px-2 py-4  my-2 cursor-pointer hover:bg-slate-200 ">
            <Link to={item.link} className='flex items-center text-slate-800 '>
               <span className="mr-2">
                   <Icon> {item.icon} </Icon>
               </span>
               {item.label}
            </Link>
           </div>)} 
        {/* </Paper> */}
        </>
    )
}
