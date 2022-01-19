import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import React from 'react'

export default function RenderTextField(props) {
    
    const { 
      labelText, value, name, handleChange, valErrors = {}, 
      disabled, variant = 'outlined', size = "small", multiline, 
      inputProps, errorKey, isHelperText = true, className = '',
      placeholder = '', sx = {}
    
    } = props

    return (
        <Box >
        <FormControl fullWidth >
          <TextField
            id={`select-${name}`}
            name={name}
            value={value}
            sx={sx}
            label={labelText}
            disabled={disabled}
            error={valErrors?.[`${errorKey ? errorKey : name}`] ? true : false}
            helperText={isHelperText ? (valErrors?.[`${errorKey ? errorKey : name}`] ?? null ) : null}
            onChange={handleChange}
            variant={variant}
            size={size}
            multiline={multiline}
            InputProps={inputProps}
            inputProps={inputProps}
            className={className}
            placeholder={placeholder}
          />
        </FormControl>
      </Box>
    )
}
