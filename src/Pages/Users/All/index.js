import React, {useEffect, useState} from 'react'
import Paper from '@mui/material/Paper'
import * as qs from 'qs'

import { TableLayout1 } from 'components/TableLayout1'

// **components
import Rendertablerow from './RenderTableRow'

// API
import { getAllUsers } from 'API/fetch'

export default function All(props) {


    const _tableHeadValues = [
        {
            id: 1,
            value: 'Name',
            align: 'left'
        },
        {
            id: 2,
            value: 'Email',
            align: 'left'
        },
        {
            id: 3,
            value: 'Address',
            align: 'left'
        },
        {
            id: 6,
        }

    ]

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)

    const query = qs.stringify(
        {
            // fields: ['title', 'body'],
            // filters: { order : { delivery_time : {$notNull : true} }},
            populate: ['default_address']
        }, 
        { encodeValuesOnly: true, }
    );


    const fetchUsersData = async () => {
        setLoading(true)
        try {
            const res = await getAllUsers(query)
            const items = res.data.data || []
            setTableData(items)

        } catch (ex) {
            
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUsersData()
    }, [])


    return (
        <>
            <div className="p-4">
                <div className='shadow-lg bg-wood rounded-xl p-2'>

                    <TableLayout1
                        tableHeadValues={_tableHeadValues}
                    >
                        {[...tableData].map((row) => (
                            <Rendertablerow
                                key={row.id}
                                tableRow={row}
                            />
                        ))}
                    </TableLayout1>
                </div>
            </div>

        </>
    )
}
