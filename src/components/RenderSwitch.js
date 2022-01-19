import React from 'react'
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';

export default function Renderswitch(props) {
    
    const { labelText, value, name, handleChange, valErrors = {}, disabled, options = [], className = '' } = props

    return (
        <> 
        <div className={`flex ${className} items-center`}>
             <Switch
                    checked={value === '1' || value === true}
                    onChange={handleChange}
                    name={name}
                    disabled={disabled}
                    />
            {labelText}
        </div>
        </>
    )
}
