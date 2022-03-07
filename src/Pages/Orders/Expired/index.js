import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Alert from '@mui/material/Alert';
import * as qs from 'qs'

// **mUi
import Renderselect from 'components/RenderSelect'

import { TableLayout1 } from 'components/TableLayout1'
import { TableLoadingProgress } from 'components/LoadingProgress'

// **components
import Rendertablerow from './RenderTableRow'
import Edit from '../../Edit'

// API
import { getOrders } from 'API/fetch'

export default function Expired(props) {


    const _tableHeadValues = [
        {
            id: 1,
            value: 'Name',
            align: 'left'
        },
        {
            id: 2,
            value: 'Address',
            align: 'left'
        },
        {
            id: 3,
            value: 'Quantity',
            align: 'left'
        },
        {
            id: 4,
            value: 'Price',
            align: 'right'
        },
        {
            id: 6,
            value: 'Expiry date',
            align: 'left',
        },
        {
            id: 7,
            value: 'Payment',
            align: 'left',
        },
        {
            id: 8,
            value: 'Status',
            align: 'left',
        }

    ]

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)

    const [modalOpen_edit, setModalOpen_edit] = useState(false)
    const [editVal, setEditVal] = useState({})
    const [filter, setFilter] = useState('relavent')

    const showEditPopup = (id) => {
        setModalOpen_edit(true)
        setEditVal(id)
    }

    const closeEditPopup = (id) => {
        setModalOpen_edit(false)
        setEditVal({})
    }

    const filterMap = {
        all: {
            sort: ['id:desc'],
            filters: {
                $and: [
                    { expiry_date: { $lt: new Date(new Date().setHours(0, 0, 0, 0)) } },
                    { user : { email :  {$notNull : true} }},
                    {deliveries : {is_delivered : {$eq : false} }}
                ]
            },
            populate: ['user_details', 'address', 'deliveries']
        },
        relavent: {
            sort: ['id:desc'],
            filters: {
                $and: [
                    { expiry_date: { $lt: new Date(new Date().setHours(0, 0, 0, 0)) } },
                    { user: { email: { $notNull: true } } },
                    // { is_delivery_confirmed : {$eq : true } },
                    {deliveries : {is_delivered : {$eq : false} }}
                ]
            },
            populate: ['user_details', 'address', 'deliveries']
        },
        
    }

    const query = qs.stringify(
        filterMap[filter],
        { encodeValuesOnly: true, }
    );


    const fetchOrdersData = async () => {
        setLoading(true)
        try {
            const res = await getOrders(query)
            const items = res.data.data || []
            setTableData(items)

        } catch (ex) {

        }
        setLoading(false)
    }

    useEffect(() => {
        fetchOrdersData()
    }, [filter])


    return (
        <>
            {modalOpen_edit &&
                <Edit
                    val={editVal}
                    onClose={closeEditPopup}
                    callback={fetchOrdersData}
                />

            }
            <div className="p-4">
                <Alert severity="error">
                    Expired order means the orders that's last delivery date is already passed
                    and box not yet delivered!
                    <br /> <br /> Apply "Relavent" filter - to get only last order of a user
                </Alert>
                <div className="p-4 flex justify-end">
                    <Renderselect
                        name="filter"
                        options={[
                            { label: 'All', value: 'all' }, { label: 'Relavent', value: 'relavent' },
                            // {label : 'Non confirmed', value : 'unconfirmed'}
                        ]}
                        handleChange={(e) => setFilter(e.target.value)}
                        value={filter}
                    />
                </div>
                <div className='shadow-lg bg-wood rounded-xl p-2'>
                    {loading ?
                        <div className="w-3/12 mx-auto" >
                            <TableLoadingProgress color="primary" text="Loading table ..." />
                        </div>

                        :

                        <TableLayout1
                            tableHeadValues={_tableHeadValues}
                        >
                            {[...tableData].map((row) => (
                                <Rendertablerow
                                    key={row.id}
                                    tableRow={row}
                                    clickEvent={showEditPopup}
                                />
                            ))}
                        </TableLayout1>
                    }
                     {tableData?.length <= 0 && <div className='text-center pt-10'>
                        No data to display!
                    </div>}
                </div>
            </div>

        </>
    )
}
