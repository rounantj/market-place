import * as React from 'react'
import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchInput({ textHelper, style }) {
  return (
    <Box style={{ minWidth: '100%' }} sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        {style ? (
          <TextField
            style={style}
            id="input-with-sx"
            label={textHelper}
            variant="standard"
          />
        ) : (
          <TextField
            style={{ minWidth: '90%' }}
            id="input-with-sx"
            label={textHelper}
            variant="standard"
          />
        )}
        <SearchIcon
          style={style}
          sx={{ color: 'action.active', mr: 1, my: 0.5 }}
        />
      </Box>
    </Box>
  )
}
