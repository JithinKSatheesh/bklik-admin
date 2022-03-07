import React, { useState, useEffect } from 'react'

import Icon from '@mui/material/Icon'
import Alert from '@mui/material/Alert';

import Renderinputs from 'components/RenderInputs'
import {  SaveButton} from 'components/CommonIcons';
import {throwToast} from 'components/ThrowToast'

// date picker
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import Renderswitch from 'components/RenderSwitch';

// ** layout
import Layout from 'Layout'

// ** API
import { editConfig, getConfig} from 'API/fetch'

export default function Index(props) {

    const _inputFieldsConfig = [
       
        // {
        //     name: "min_recipes",
        //     labelText: "Min Recipe per week",
        //     type: 'text',
        //     wrapperClass: ''
        // },
        // {
        //     name: "max_recipes",
        //     labelText: "Max Recipe per week",
        //     type: 'text',
        //     wrapperClass: ''
        // },
         // {
        //     name: "min_people",
        //     labelText: "Min People",
        //     type: 'text',
        //     wrapperClass: ''
        // },
        // {
        //     name: "max_people",
        //     labelText: "Max People",
        //     type: 'text',
        //     wrapperClass: ''
        // },
        {
            name: "price",
            labelText: "Price",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "no_of_people_list",
            labelText: "No of people [list] (seperated by comma)",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "no_of_recipies_list",
            labelText: "No of Recipes per week [list] (seperated by comma)",
            type: 'text',
            wrapperClass: ''
        },
        {
            name: "delivery_time_range",
            labelText: "delivery_time_range",
            type: 'textarea',
            wrapperClass: '',
            placeholder : 'Comma seperated list eg: 3:00 - 4:00, 4:00 -  5:00'
        },
    ]

    const initialConfigVal = {
        id : '',
        price : '',
        // min_recipes : '',
        // max_recipes : '',
        // max_people : '',
        // min_people : '',
        no_of_people_list : '',
        no_of_recipies_list : '',
        delivery_from_month : new Date(),
        delivery_to_month : new Date(),
        delivery_blocked_dates : [],
        allow_custom_delivery_date : false,
        delivery_time_range : ''
    }
    
    const [inputVal, setInputVal] = useState(initialConfigVal)
    const [loading, setLoading] = useState(false)

    const [selectedDays, setselectedDays] = useState([])
    const [customDisableDay, setcustomDisableDay] = useState(false)
    // const [selectedDays2, setselectedDays2] = useState([1, 2, 3])
    const [fromMonth, setfromMonth] = useState(new Date())
    const [toMonth, settoMonth] = useState(new Date())

    const disabledDaysFixed = {
        daysOfWeek : [1,2,3,4,5]
    }

    // const findDisabledDate = (day) => {
    //     console.log(day.getDate())
    //     const index = selectedDays2.findIndex(_day => _day === day.getDate())
    //     return index !== -1
    // }

    const findSelectedDays = (day) => {
        // console.log(day.getDate())
        const index = selectedDays.findIndex(_day => _day === day.getDate())
        return index !== -1
    }

    const handleDayClick = (day, { selected }) => {
        const _selectedDays = [...selectedDays]
        if (selected) {
          const selectedIndex = _selectedDays.findIndex(selectedDay =>
            // DateUtils.isSameDay(selectedDay, day)
            day.getDate() === selectedDay
          );
          _selectedDays.splice(selectedIndex, 1);
        } else {
            _selectedDays.push(day.getDate());
        }
        setselectedDays(_selectedDays)
      }

    const handleInputChange = (e) => {
        setInputVal(prev => ({
            ...prev,
            ...e
        }))
    }

    const fetchConfigData = async () => {
        setLoading(true)
        try {
            const res = await getConfig()
            const items = res?.data?.data ?? {}
            setInputVal(prev => ({
                ...prev,
                ...items,
                delivery_from_month : items?.delivery_from_month? new Date(items?.delivery_from_month) : new Date(),
                delivery_to_month : items?.delivery_to_month? new Date(items?.delivery_to_month) : new Date(),
                // delivery_time_range : items?.delivery_time_range ? JSON.stringify(items.delivery_time_range) : ''
            }))
            const delivery_blocked_dates = items?.delivery_blocked_dates?.split(',') || []
            const _delivery_blocked_dates = delivery_blocked_dates.map(val => parseInt(val))
            // console.log(delivery_blocked_dates, "***")
            setselectedDays([..._delivery_blocked_dates])
            
            

        } catch (ex) {
            
        }
        setLoading(false)
    }

    const editConfigData = async () => {
        setLoading(true)
        const _payload = {
            ...inputVal, 
            delivery_blocked_dates : selectedDays.toString()
            // delivery_time_range : JSON.parse(inputVal.delivery_time_range)
        }
        try {
            const res = await editConfig(inputVal.id, _payload)
            fetchConfigData()
            throwToast.success("Updated")

        } catch (ex) {
            throwToast.error("Error")   
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchConfigData()
    }, [])


    return (
        <>
        <Layout>
        <div className='p-4'>
            <div className="font-bold text-lg flex items-center">
               <Icon className='mr-2'> settings </Icon> Config
            </div>
        </div>
        <div className="p-4 w-1/2">
            <Alert severity='error' > Edit with caution - This page data will directly affect main website </Alert>
        </div>

        <div className="p-4">
            <Renderinputs
                inputFileds={_inputFieldsConfig}
                handleInputChange={handleInputChange}
                inputVal={inputVal}
                loading={loading}
                // valErrors={valErrors}
                wrapperClass="my-2 w-2/4 "
            />
            <Alert severity='warning' icon={false} className='max-w-xl'>
                Enter comma seperated list eg: [3:00 PM - 4:00 PM, 4:00 PM -  5:00 PM]
            </Alert>
        </div>
        {/* {console.log(selectedDays)} */}
        {/* {console.log(fromMonth)} */}
        <div className="p-2">
            <div className="p-2 text-red-500 font-bold">
                Delivery calander range
            </div>
            <DatePicker
            views={['month']}
            label="From Month"
            value={inputVal?.delivery_from_month}
            onChange={(newValue) => {
                handleInputChange({ "delivery_from_month" : newValue});
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
            />
            <DatePicker
            views={['month']}
            label="To Month"
            value={inputVal?.delivery_to_month}
            onChange={(newValue) => {
                handleInputChange({ "delivery_to_month" : newValue});
            }}
            renderInput={(params) => <TextField {...params} helperText={null} />}
            />
        </div>
        <div className="p-4">
            <div className="p-2">
                <Alert severity='info' icon={false}>
                    <Renderswitch
                        value={inputVal?.allow_custom_delivery_date}
                        handleChange={(e) => handleInputChange({ allow_custom_delivery_date : e.target.checked})}
                        labelText="Allow custom delivery dates " />
                        "OFF" position means Mon to Friday is be blocked. Change to "on" position to select custom block dates.
                </Alert>
            </div>
            {inputVal?.allow_custom_delivery_date &&
            <>
                <div className="p-2 text-red-500 font-bold">
                    Click to block delivery days 
                </div>
                {/* {console.log(inputVal)} */}
                <DayPicker
                selectedDays={findSelectedDays}
                onDayClick={inputVal?.allow_custom_delivery_date ? handleDayClick : null}
                fromMonth={inputVal?.delivery_from_month}
                toMonth={inputVal?.delivery_to_month}
                disabledDays={inputVal?.allow_custom_delivery_date ? findSelectedDays : disabledDaysFixed}
                
                />
            </>}
        </div>
        <div className="p-4">
            <SaveButton callback={editConfigData} loading={loading} label="Update" />
        </div>

        </Layout>
        </>
    )
}
