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
       
    }
    // console.log(tableRow)


    return (
        <>
            <TableRow hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell   className="cursor-pointer w-2/5" align={'right'}>
                    <div className="flex items-center">
                        <div className="pr-10 text-green-700"> <Icon>person</Icon> </div>
                        <div>
                            <Typography color="inherit"  >
                                {tableRow['username']}
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
                        
                            {tableRow?.default_address?.address}
                        
                   
                </TableCell>
                <TableCell align="right" >
                    
                </TableCell>


            </TableRow>
        </>
    )
}
