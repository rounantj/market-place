import * as React from 'react'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'

export default function BarcodeSearch({ textHelper }) {
  return (
    <Box style={{ minWidth: '100%' }} sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <ViewWeekIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          style={{ fontSize: '4rem', width: '100%' }}
          focused={true}
          id="input-with-sx"
          label={textHelper}
          variant="standard"
        />
      </Box>
    </Box>
  )
}
