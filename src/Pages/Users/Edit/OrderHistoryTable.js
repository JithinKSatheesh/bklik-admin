import React from 'react';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Icon from '@mui/material/Icon';

export const OrderHistoryTable = (props) => {

    const { order_histories = [] } = props;

    return (<div className="py-2">
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id </TableCell>
                    <TableCell>Order date </TableCell>
                    <TableCell> Info </TableCell>
                    <TableCell> Price </TableCell>
                    <TableCell> Payment </TableCell>
                    <TableCell> Expiry date </TableCell>
                    <TableCell> Status </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {order_histories?.map(item => {
                    return (<TableRow>
                        <TableCell>
                            {item?.id}
                        </TableCell>
                        <TableCell>
                            {(`${item?.createdAt}`).substring(0, 10)}
                        </TableCell>
                        <TableCell>
                            {item?.weeks} weeks x {item?.people} people
                        </TableCell>
                        <TableCell>
                            {item?.total_price}
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center">
                                {item?.payment_mode}
                                {item?.is_payment_confirmed ?
                                    <Icon className='text-green-500'> check</Icon>
                                    :
                                    <Icon className='text-red-500'> warning_amber </Icon>}
                            </div>
                        </TableCell>
                        <TableCell>
                            {item?.expiry_date}
                        </TableCell>
                        <TableCell>
                            {item?.is_canceled ?
                                <span className='text-red-500'> Canceled</span> 
                                 : 
                                <span className='text-green-500'> Ok </span>}
                        </TableCell>

                    </TableRow>);
                })}
            </TableBody>
        </Table>
    </div>);
};
