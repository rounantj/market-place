import * as React from 'react'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

export default function RebootAlert({ type = 'info', text }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={type}>{text}</Alert>
    </Stack>

    // <Alert severity="error">
    // <AlertTitle>Error</AlertTitle>
    // This is an error alert — <strong>check it out!</strong>
    // </Alert>
  )
}
