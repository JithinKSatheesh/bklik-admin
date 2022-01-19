import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';

import React from 'react'

export default function RenderDatePicker(props) {
    
    const { labelText, value, name, handleChange, valErrors = {}, disabled, variant = 'outlined', size = "small", errorKey } = props
    return (
        <Box >
        <FormControl fullWidth >
          <DatePicker
            value={value}
            views={['day']}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField 
                {...params}  
                disabled={disabled}
                label={labelText}
                error={valErrors?.[`${errorKey ? errorKey : name}`] ? true : false}
                helperText={valErrors?.[`${errorKey ? errorKey : name}`] ?? null}
                variant = {variant}
                size={size}
                />
            )}
          />
        </FormControl>
      </Box>
    )
}
