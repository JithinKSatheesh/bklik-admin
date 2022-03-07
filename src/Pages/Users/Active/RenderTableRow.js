import React, { useState } from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import  LinearProgress from '@mui/material/LinearProgress';


// import {  DeleteButton } from 'app/customComponents/CommonIcons';
// import Renderswitch from 'app/customComponents/RenderSwitch'

export default function Rendertablerow(props) {

    const { tableRow, clickEvent, index, page, dataLimit } = props;
    const [loading, setLoading] = useState(false);

    const handleClickEvent = async() => {
        clickEvent(tableRow)
    }
    // console.log(tableRow)


    return (
        <>

            <TableRow onClick={handleClickEvent} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell   className="cursor-pointer w-2/5" align={'right'}>
                    <div className="flex items-center">
                        <div className="pr-3">
                            {(((page - 1) * dataLimit) + (index + 1))}
                        </div>
                        <div className="pr-6 text-green-700"> <Icon>person</Icon> </div>
                        <div>
                            <Typography color="inherit"  >
                                {tableRow['name']}
                            </Typography>
                        </div>
                    </div>
                </TableCell>
                <TableCell  className="cursor-pointer w-2/5" align={'left'}>
                <div className="flex items-center">
                    <div className="pr-10 text-yellow-800"> <Icon>email</Icon> </div>
                    <div>
                        <Typography color="inherit"  >
                            {tableRow['email']}
                        </Typography>
                    </div>
                </div>
                </TableCell>
                <TableCell  className="cursor-pointer w-2/5" align={'left'}>
                        
                    {tableRow?.default_address?.phone}
                        
                   
                </TableCell>
                <TableCell align="right" >
                    {tableRow?.blocked ?
                        <span className='text-red-500'> Deleted </span>
                        :
                        (
                            tableRow?.order?.deliveries[tableRow?.order?.deliveries?.length - 1 || 0]
                            &&
                            tableRow?.order?.deliveries[tableRow?.order?.deliveries?.length - 1 || 0]?.is_delivered === false 
                        )
                            ?
                            <span className='text-green-500'> Active&nbsp;Order </span>
                            :
                            <span className='text-amber-500'> No&nbsp;active&nbsp;order </span>
                    }
                </TableCell>


            </TableRow>
        </>
    )
}
