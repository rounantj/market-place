import * as React from 'react'
import Box from '@mui/material/Box'

import TextField from '@mui/material/TextField'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

export default function InputAdd({ quantidade, setQuantidade }) {
  async function menos() {
    await setQuantidade(quantidade - 1)
  }
  async function mais() {
    await setQuantidade(quantidade + 1)
  }
  return (
    <Box style={{ minWidth: '50%' }} sx={{ '& > :not(style)': { m: 1 } }}>
      <label>Quantidade: {'  '}</label>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <RemoveCircleIcon
          onClick={menos}
          style={{ cursor: 'pointer' }}
          sx={{ color: 'error', mr: 1, my: 0.5 }}
        />
        <TextField
          type={'number'}
          id="input-with-sx"
          readonly
          value={quantidade}
          variant="standard"
          style={{ fontSize: '2rem', alignItems: 'right' }}
        />
        <AddCircleIcon
          onClick={mais}
          style={{ cursor: 'pointer' }}
          sx={{ color: 'action.active', mr: 1, my: 0.5 }}
        />
      </Box>
    </Box>
  )
}
