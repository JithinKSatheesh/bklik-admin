import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { findObjectById } from 'services/utils'

import React, { useState } from 'react'

export default function Renderselect(props) {

  const {
    labelText, value, name,
    handleChange, valErrors = {},
    disabled, options = [],
    variant = 'outlined', size = "small",
    className = '', placeholder = '',
    groupBy = () => {},

  } = props

  const [inputValue, setInputValue] = useState('')

  return (
    <Box>

      <Autocomplete
        id={`select-${name}`}
        value={findObjectById(options, value)?.label ?? ''}
        label={labelText}
        disabled={disabled}
        onChange={handleChange}
        groupBy={groupBy}
        // getOptionLabel={(option) => option.label}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={options}
        size={size}
        renderInput={(params) =>
          <TextField {...params}
            label={labelText}
            error={valErrors?.[`${name}`] ? true : false}
            helperText={valErrors?.[`${name}`] ?? null}
            variant={variant}
            className={className}
            placeholder={placeholder}
          />}
      />
    </Box>
  )
}
