import * as React from 'react'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export default function InputAdd({ quantidade, setQuantidade }) {
  return (
    <Box style={{ minWidth: '50%' }} sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <TextField
          type={'number'}
          id="input-with-sx"
          label="Quantidade"
          defaultValue={1}
          value={quantidade}
          variant="standard"
          style={{ fontSize: '2rem' }}
        />
        <AddCircleIcon
          onClick={() => setQuantidade(quantidade + 1)}
          style={{ cursor: 'pointer' }}
          sx={{ color: 'action.active', mr: 1, my: 0.5 }}
        />
      </Box>
    </Box>
  )
}
