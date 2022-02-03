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

    const { tableRow, clickEvent } = props;
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
                        <div className="pr-10 text-green-700"> <Icon>person</Icon> </div>
                        <div>
                            <Typography color="inherit"  >
                                {tableRow?.user?.username}
                            </Typography>
                        </div>
                    </div>
                </TableCell>
                <TableCell  className="cursor-pointer w-2/5" align={'left'}>
                <div className="flex items-center">
                    <div className=' text-xs truncate max-w-xl'>
                       
                            {tableRow?.description}
                        
                    </div>
                </div>
                </TableCell>
                <TableCell  className="cursor-pointer w-2/5" align={'right'}>
                            {(`${tableRow?.createdAt}`).substring(0, 10)}
                </TableCell>
            </TableRow>
        </>
    )
}
