import * as React from 'react'
import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

export default function InputSearchNative({
  textHelper,
  style,
  placeholder,
  onKeyUp,
  type = 'text',
}) {
  const fn = (e) => {
    onKeyUp(e.target.value)
  }
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }} style={{ minWidth: '600px' }}>
      <Box
        sx={{ display: 'flex', alignItems: 'flex-end' }}
        style={{ minWidth: '600px' }}
      >
        <TextField
          style={{ minWidth: '600px' }}
          onKeyUp={fn}
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
