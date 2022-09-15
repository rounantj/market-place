import * as React from 'react'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

export default function InputSearchNative({
  textHelper,
  style,
  placeholder,
  type = 'text',
}) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }} style={{ minWidth: '600px' }}>
      <Box
        sx={{ display: 'flex', alignItems: 'flex-end' }}
        style={{ minWidth: '600px' }}
      >
        <TextField
          style={{ minWidth: '600px' }}
          id="input-with-sx"
          label={textHelper}
          placeholder={placeholder}
          variant="standard"
        />
        <SearchIcon
          style={style}
          sx={{ color: 'action.active', mr: 1, my: 0.5 }}
        />
      </Box>
    </Box>
  )
}
