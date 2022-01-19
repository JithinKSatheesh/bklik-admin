import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';

import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import React, {useState} from 'react'

export default function RenderPasswordField(props) {
    
    const { labelText, value, name, handleChange, valErrors = {}, disabled, variant = 'outlined', size = "small", multiline } = props

    const [showPassword, setShowPassword] = useState(false)

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth >
          <TextField
            id={`select-${name}`}
            name={name}
            value={value}
            type="password"
            label={labelText}
            disabled={disabled}
            error={valErrors?.[`${name}`] ? true : false}
            helperText={valErrors?.[`${name}`] ?? null}
            onChange={handleChange}
            variant={variant}
            size={size}
            multiline={multiline}
            placeholder="password"
            InputProps={{
              className: 'pr-2',
              type: showPassword ? 'text' : 'password',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                    <Icon className="text-20" color="action">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </Icon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
    )
}
