import React, {useEffect, useState} from 'react'
import Paper from '@mui/material/Paper'
import * as qs from 'qs'

// **mUi
import Renderselect from 'components/RenderSelect'

import { TableLayout1 } from 'components/TableLayout1'

// **components
import Rendertablerow from './RenderTableRow'
import Edit from '../Edit'

// API
import { getAllUsers } from 'API/fetch'

export default function Active(props) {


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

    const [modalOpen_edit, setModalOpen_edit] = useState(false)
    const [editVal, setEditVal] = useState({})
    const [filter, setFilter] = useState('all')

    const showEditPopup = (id) => {
        setModalOpen_edit(true)
        setEditVal(id)
    }

    const closeEditPopup = (id) => {
        setModalOpen_edit(false)
        setEditVal({})
    }

    const filterMap = {
        active : {
            filters: { 
                order : { 
                    delivery_time : {$lte : (new Date()).setHours(0,0,0,0)} ,
                },
            },
            // filters: { order : { id : {$eq : 4} }},
            populate: ['default_address', 'addresses']
        },
        all : {
            // filters: { order : { delivery_time : {$notNull : true} }},
            populate: ['default_address', 'addresses']
        },
    }

    const query = qs.stringify(
        filterMap[filter], 
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
    }, [filter])


    return (
        <>
            {modalOpen_edit && 
                <Edit
                    val={editVal}
                    onClose={closeEditPopup}
                    callback={fetchUsersData}
                /> 
                
            }
            <div className="p-4">
                <div className="p-4 flex justify-end">
                    <Renderselect
                        name="filter" 
                        options={[{label : 'All' , value : 'all'}, {label : 'Active', value : 'active'}]}  
                        handleChange={(e) => setFilter(e.target.value)}
                        value={filter}
                        />
                </div>
                <div className='shadow-lg bg-wood rounded-xl p-2'>

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
                </div>
            </div>

        </>
    )
}
