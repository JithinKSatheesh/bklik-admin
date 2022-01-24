import React, { useState } from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';

// import {  DeleteButton } from 'app/customComponents/CommonIcons';
// import Renderswitch from 'app/customComponents/RenderSwitch'

export default function Rendertablerow(props) {

    const { tableRow, clickEvent } = props;
    const [loading, setLoading] = useState(false);

    const handleClickEvent = async() => {
        clickEvent(tableRow)
    }
    // console.log(tableRow)


    return (
        <>
            <TableRow onClick={handleClickEvent} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell   className="cursor-pointer w-2/5" align={'left'}>
                
                        <div className='text-xs '>
                            {tableRow?.user_details?.username}
                        </div>
                        <div className="text-xs text-slate-500">
                            {tableRow?.user_details?.email}
                        </div>
                        
                    
                </TableCell>
                <TableCell  className="cursor-pointer w-2/5" align={'left'}>
                    <div className="text-xs">
                        {tableRow?.address?.address}
                    </div>
                </TableCell>
                <TableCell  className="cursor-pointer w-2/5" align={'left'}>
                    <div className="text-xs">
                        {tableRow?.weeks} weeks x  {tableRow?.people} people
                    </div>
                </TableCell>
                <TableCell align="right" >
                    <div className="text-xs font-bold cursor-pointer">
                        {tableRow?.total_price}
                    </div>
                </TableCell>
                <TableCell align="left" >
                    <div className="text-xs font-bold w-24 cursor-pointer">
                        {(`${tableRow?.expiry_date}`).substring(0, 10)}
                    </div>
                </TableCell>
                <TableCell align="left" >
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
                        {tableRow.is_delivery_confirmed ?
                            <div className="text-green-800"> Confirmed</div>
                            :
                            <div className="text-red-800"> Not confirmed</div>
                        }
                        
                    </div>
                </TableCell>


            </TableRow>
        </>
    )
}
