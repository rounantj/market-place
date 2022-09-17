import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import SwitchReboot from '../inputs/switch'
import { Stack } from '@mui/system'

export default function Confirmation({ fecharPedido, cancel, open }) {
  const [mail, setMail] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const mudaEmailOk = async (e) => {
    await setMail(e.target.checked)
    console.log(mail)
  }

  const mudaName = async (e) => {
    await setName(e.target.value)
    console.log(name)
  }

  const mudaEmail = async (e) => {
    await setEmail(e.target.value)
    console.log(email)
  }

  return (
    <div>
      <Dialog open={open} onClose={cancel}>
        <DialogTitle>Finalizar venda</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            onBlur={mudaName}
            autoFocus
            margin="dense"
            id="name"
            label="Nome do cliente"
            type="text"
            fullWidth
            variant="standard"
          />
          <Stack style={{ padding: '15px', gap: '15px' }} direction={'row'}>
            <DialogContentText>Enviar feedback por e-mail?</DialogContentText>
            <SwitchReboot setOk={mudaEmailOk} />
          </Stack>

          {mail ? (
            <TextField
              autoFocus
              onBlur={mudaEmail}
              margin="dense"
              id="name"
              label="Endereço de e-mail"
              type="email"
              fullWidth
              variant="standard"
            />
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Cancelar</Button>
          <Button onClick={() => fecharPedido(name, email)}>Finalizar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
