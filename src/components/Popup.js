import React from 'react'
import {CloseButton} from 'components/CommonIcons'
import LinearProgress from '@mui/material/LinearProgress';


export default function Popup({children, ...props}) {
    
    const {onClose, loading} = props

    return (
        <>
        <div className='z-50 fixed top-0 left-0 h-screen w-full bg-slate-300/50 py-24  overflow-auto'>
            <div className="w-8/12  bg-wood rounded-xl mx-auto p-4"> 
                {loading && <LinearProgress />}
                <div className="flex justify-end">
                    <CloseButton callback={onClose} />
                </div>
            {children}
            </div>
        </div>
            
        </>
    )
}
