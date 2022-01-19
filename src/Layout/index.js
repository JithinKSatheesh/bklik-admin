import React from 'react'
import Sidebar from './Sidebar'

export default function Index({children ,...props}) {
    

    return (
        <>
        <div className="w-full h-16  bg-green bg-texture shadow fixed"></div>
        <div className='flex bg-wood bg-texture'>
            <div className="w-56 h-screen pt-24 border-r-2 ">
                <Sidebar />
            </div>
            <div className="w-full pt-24 ">
                {children}
            </div>
        </div>
        </>
    )
}
