import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import RebootTable from '../tables/defaultTable'

export default function ValidationTextFields({
  id,
  label,
  error = false,
  defaultValue,
  placeholder,
  helperText,
}) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {/* <div>
        <TextField
          error
          id="outlined-error"
          label="Error"
          defaultValue="Hello World"
        />
        <TextField
          error
          id="outlined-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        />
      </div> */}
      <div>
        {/* <TextField
          error={false}
          id="filled-error"
          label="Error"
          defaultValue="Hello World"
          variant="filled"
        /> */}
        <TextField
          error={error}
          id={id}
          label={label}
          placeholder={placeholder}
          //defaultValue={defaultValue ? defaultValue : ''}
          helperText={helperText}
          variant="filled"
        />
      </div>
      {/* <div>
        <TextField
          error
          id="standard-error"
          label="Error"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
          variant="standard"s
        />
      </div> */}
    </Box>
  )
}
