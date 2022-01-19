import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import React from 'react'

export default function Renderselect(props) {
    
    const { 
      labelText, value, name, handleChange, 
      valErrors = {}, disabled, options = [], 
      variant = 'outlined',  size = "small", placeholder,
      errorKey, isHelperText = true,
    } = props

    return (
        <Box >
        <FormControl fullWidth >
          {/* <InputLabel id={`select-label-${name}`}>{labelText}</InputLabel> */}
          <TextField
            // labelId={`select-label-${name}`}
            id={`select-${name}`}
            name={name}
            value={value}
            select
            label={labelText}
            disabled={disabled}
            error={valErrors?.[`${errorKey ? errorKey : name}`] ? true : false}
            helperText={isHelperText ? (valErrors?.[`${errorKey ? errorKey : name}`] ?? null ) : null}
            onChange={handleChange}
            variant={variant}
            size={size}
            placeholder={placeholder}
          >
            {placeholder &&  <MenuItem value=""><em>{placeholder}</em></MenuItem>}
            {options.map(item => <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>)}
          </TextField>
        </FormControl>
      </Box>
    )
}
