import * as React from 'react'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Stack from '@mui/material/Stack'

export default function AddButton() {
  return (
    <Stack style={{ float: 'right' }} direction="row" spacing={2}>
      <Button
        style={{ backgroundColor: 'lightgreen', color: 'black' }}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Adicionar
      </Button>
    </Stack>
  )
}