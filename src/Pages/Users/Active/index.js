import React, {useEffect, useState} from 'react'
import Paper from '@mui/material/Paper'
import * as qs from 'qs'

// **mUi
import Renderselect from 'components/RenderSelect'
import {TableLoadingProgress} from 'components/LoadingProgress'
import RenderTextField from 'components/RenderTextField'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
            value: 'Phone',
            align: 'left'
        },
        {
            id: 6,
            value: 'Status',
            align: 'right'
        }

    ]

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)

    const [modalOpen_edit, setModalOpen_edit] = useState(false)
    const [editVal, setEditVal] = useState({})
    const [filter, setFilter] = useState('active')
    const [searchQuery, setSearchQuery] = useState('')
    const [dataLimit, setDataLimit] = useState(20)
    const [totalDataCount, setTotalDataCount] = useState(0)

    const [page, setPage] = useState(1)
    const pagnationCount = dataLimit > 0 ? Math.ceil(totalDataCount/dataLimit) : 1
    
    const handleChangePage = (event, value) => {
        setPage(value);
      };

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
            where: { 
                $and : [
                    { 
                        order : {
                                expiry_date : {$gte : new Date(new Date().setHours(0,0,0,0)) },
                                deliveries : {is_delivered : {$eq : false} }
                            }
                    }
                ]
            },
            _q : searchQuery,
            select : ['username','email', 'phone', 'blocked', 'name'],
            // filters: { order : { id : {$eq : 4} }},
            // populate: ['default_address', 'addresses', 'order'],
            populate : {
                default_address : {
                    sort: 'id:asc',
                },
                addresses : {
                    sort: 'id:asc',
                },
                order : {
                    populate : ['deliveries']
                }
            },
            offset : (page - 1) >= 0 ? (page - 1)  * dataLimit : 0,
            limit: dataLimit,
        },
        all : {
            // filters: { order : { delivery_time : {$notNull : true} }},
            _q : searchQuery,
            select : ['username','email', 'phone', 'blocked', 'name'],
            // populate: ['default_address', 'addresses', 'order'],
            populate : {
                default_address : {
                    sort: 'id:asc',
                },
                addresses : {
                    sort: 'id:asc',
                },
                order : {
                    populate : ['deliveries']
                }
            },
            offset : (page - 1) >= 0 ? (page - 1)  * dataLimit : 0,
            limit: dataLimit,
        },
        deleted : {
            where: { blocked :  {$eq : true} },
            _q : searchQuery,
            select : ['username','email', 'phone', 'blocked', 'name'],
            // populate: ['default_address', 'addresses', 'order'],
            populate : {
                default_address : {
                    sort: 'id:asc',
                },
                addresses : {
                    sort: 'id:asc',
                },
                order : {
                    populate : ['deliveries']
                }
            },
            offset : (page - 1) >= 0 ? (page - 1)  * dataLimit : 0,
            limit: dataLimit,
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
            const [items, count] = res.data.data || [[], '']
            // const items = res.data.data || []
            setTotalDataCount(count)
            // alert(count)
            setTableData(items)

        } catch (ex) {
            
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUsersData()
    }, [filter, searchQuery, dataLimit, page])


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
                <div className="p-4 flex justify-between">
                    <div className='flex justify-center items-center'>
                        <RenderTextField
                            name='search'
                            className="mr-2 w-24"
                            value={dataLimit}
                            handleChange={e => setDataLimit(e.target.value)}
                            placeholder="Data per page"
                        />
                         <div className='ml-6'>
                            Data per page
                        </div>
                    </div>
                    <div className='flex'>
                        <RenderTextField 
                            name='search' 
                            className="mr-2 w-96"
                            value={searchQuery}
                            handleChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search by user, email or phone" 
                            />
                        <Renderselect
                            name="filter" 
                            options={[
                                {label : 'All' , value : 'all'}, 
                                {label : 'Active', value : 'active'},
                                {label : 'Deleted', value : 'deleted'},
                            ]}  
                            handleChange={(e) => setFilter(e.target.value)}
                            value={filter}
                            />
                    </div>

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
                       

                        {[...tableData].map((row, index) => (
                            <Rendertablerow
                                key={row.id}
                                tableRow={row}
                                index={index}
                                page={page}
                                dataLimit={dataLimit}
                                loading={loading}
                                clickEvent={showEditPopup}
                            />
                        ))}

                    </TableLayout1>
                    }
                     {tableData?.length <= 0 && <div className='text-center  pt-10'> 
                            No data to display!
                        </div>}

                </div>

                <div className='flex justify-end'>
                    <Pagination 
                        page={page}
                        // count={10}
                        count={parseInt(pagnationCount)} 
                        onChange={handleChangePage}
                        className=" mt-4" />

                </div>
            </div>

        </>
    )
}
