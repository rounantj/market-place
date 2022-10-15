import * as React from 'react'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Stack from '@mui/material/Stack'

export default function NormalButton({
  deleteButton,
  callback,
  texto,
  pedido,
}) {
  return (
    <Stack style={{ width: '100%' }} direction="row" spacing={2}>
      {deleteButton ? (
        <Button
          onClick={() => callback(pedido)}
          style={{ float: 'right', margin: 'auto' }}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          {texto}
        </Button>
      ) : (
        <Button variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      )}
    </Stack>
  )
}
