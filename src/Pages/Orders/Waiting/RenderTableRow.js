import React, { useState } from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';

import {  SaveButton } from 'components/CommonIcons';
// import Renderswitch from 'app/customComponents/RenderSwitch'

export default function Rendertablerow(props) {

    const { tableRow, clickEvent, confirmOrder } = props;
    const [loading, setLoading] = useState(false);

    const handleClickEvent = async() => {
        clickEvent(tableRow)
    }

    const handleConfirmClickEvent = async() => {
        setLoading(true)
        await confirmOrder(tableRow.id)
        setLoading(false)
    }
    // console.log(tableRow)




    return (
        <>
            <TableRow  hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell  onClick={handleClickEvent}  className="cursor-pointer w-2/5" align={'left'}>
                
                        <div className='text-xs '>
                            {tableRow?.user_details?.username}
                        </div>
                        <div className="text-xs text-slate-500">
                            {tableRow?.user_details?.email}
                        </div>
                        
                    
                </TableCell>
                <TableCell onClick={handleClickEvent}  className="cursor-pointer w-2/5" align={'left'}>
                    <div className="text-xs">
                        {tableRow?.address?.address}
                    </div>
                </TableCell>
                <TableCell onClick={handleClickEvent}  className="cursor-pointer w-2/5" align={'left'}>
                    <div className="text-xs">
                        {tableRow?.recipe_per_week} recipe_per_week x  {tableRow?.people} people
                    </div>
                </TableCell>
                <TableCell onClick={handleClickEvent} align="right" >
                    <div className="text-xs font-bold cursor-pointer">
                        {tableRow?.total_price}
                    </div>
                </TableCell>
             
                <TableCell onClick={handleClickEvent} align="left" >
                    <div className="text-xs  w-24 cursor-pointer flex items-center">
                        <span className='mr-3'> {tableRow?.payment_mode}</span>
                        {tableRow?.is_payment_confirmed ? 
                            <Icon className='text-green-800'> check </Icon>
                            :
                            <Icon className='text-amber-400'> warningAmber </Icon>
                        }
                    </div>
                </TableCell>
                <TableCell align="left" >
                    <div className="text-xs font-bold w-24">
                       <SaveButton loading={loading} callback={handleConfirmClickEvent} label="Confirm" />
                    </div>
                </TableCell>


            </TableRow>
        </>
    )
}
