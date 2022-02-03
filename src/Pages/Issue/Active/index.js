import React, {useEffect, useState} from 'react'
import Paper from '@mui/material/Paper'
import * as qs from 'qs'

// **mUi
import Renderselect from 'components/RenderSelect'
import {TableLoadingProgress} from 'components/LoadingProgress'
import RenderTextField from 'components/RenderTextField'

import { TableLayout1 } from 'components/TableLayout1'

// **components
import Rendertablerow from './RenderTableRow'
import Edit from '../Edit'

// API
import { getIssues } from 'API/fetch'

export default function Active(props) {


    const _tableHeadValues = [
        {
            id: 1,
            value: 'Name',
            align: 'left'
        },
        {
            id: 2,
            value: 'Description',
            align: 'left'
        },
        {
            id: 3,
            value: 'Date',
            align: 'right'
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
    const [searchQuery, setSearchQuery] = useState('')
    

    const showEditPopup = (id) => {
        setModalOpen_edit(true)
        setEditVal(id)
    }

    const closeEditPopup = (id) => {
        setModalOpen_edit(false)
        setEditVal({})
    }

    const filterMap = {
        solved : {
            sort: ['id:desc'],
            filters: { is_solved : {$eq : true } },
            // _q : searchQuery,
            // fields : ['username','email', 'phone'],
            // filters: { order : { id : {$eq : 4} }},
            populate: ['user', 'order']
        },
        all : {
            sort: ['id:desc'],
            // _q : searchQuery,
            // fields : ['username','email', 'phone'],
            populate: ['user', 'order']
        },
    }

    const query = qs.stringify(
        filterMap[filter], 
        { encodeValuesOnly: true, }
    );


    const fetchIssueData = async () => {
        setLoading(true)
        try {
            const res = await getIssues(query)
            console.log(res)
            const items = res.data.data || []
            setTableData(items)

        } catch (ex) {
            
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchIssueData()
    }, [filter])


    return (
        <>
            {modalOpen_edit && 
                <Edit
                    val={editVal}
                    onClose={closeEditPopup}
                    callback={fetchIssueData}
                /> 
                
            }
            <div className="p-4">
                <div className="p-4 flex justify-end">
                    <Renderselect
                        name="filter" 
                        options={[{label : 'All' , value : 'all'}, {label : 'Solved', value : 'solved'}]}  
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
                                loading={loading}
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
