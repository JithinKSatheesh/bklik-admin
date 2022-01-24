import React, { useEffect, useState } from 'react'

import Alert from '@mui/material/Alert';
import * as qs from 'qs'
import DateRangePicker from '@mui/lab/DateRangePicker';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// **mUi
import Renderselect from 'components/RenderSelect'

import { TableLayout1 } from 'components/TableLayout1'

// **components
import Rendertablerow from './RenderTableRow'
import Edit from '../../Edit'
import { TableLoadingProgress } from 'components/LoadingProgress'

// API
import { getOrders } from 'API/fetch'

export default function Active(props) {


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
    const [dateRange, setDateRange] = useState([null, null]);

    const [modalOpen_edit, setModalOpen_edit] = useState(false)
    const [editVal, setEditVal] = useState({})
    const [filter, setFilter] = useState('confirmed')

    const showEditPopup = (id) => {
        setModalOpen_edit(true)
        setEditVal(id)
    }

    const closeEditPopup = (id) => {
        setModalOpen_edit(false)
        setEditVal({})
    }

    const filterMap = {
        confirmed: {
            filters: {
                $and: [
                    {
                        deliveries: { delivery_date: { $gte: new Date(dateRange[0]) } }
                    },
                    {
                        deliveries: { delivery_date: { $lte: new Date(dateRange[1]) } }
                    },
                    { expiry_date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } },
                    { user: { email: { $notNull: true } } },
                    { is_delivery_confirmed: { $eq: true } },
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
    }, [dateRange])


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
                    Active  means - All orders that is not expired!
                    <br />
                    {'Only confirmed orders will appear here! ( To view unconfirmed order visit > orders > Waiting )'}
                </Alert>
                <div className="p-4 flex justify-end">
                    {/* <Renderselect
                        name="filter" 
                        options={[ {label : 'All', value : 'all'},{label : 'Confirmed', value : 'confirmed'}, {label : 'Non confirmed', value : 'unconfirmed'}]}  
                        handleChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        /> */}
                    <DateRangePicker
                        className="w-full"
                        startText="Date From"
                        endText="Date to"
                        calendars={1}
                        value={dateRange}
                        onChange={newVal => setDateRange(newVal)}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}

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
                </div>
            </div>

        </>
    )
}
