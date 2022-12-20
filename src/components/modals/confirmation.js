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
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

export default function Confirmation({ fecharPedido, cancel, open, totalOrder }) {
  const [mail, setMail] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [desconto, setDesconto] = React.useState(0)
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

  const darDesconto = async (e) => {
    await setDesconto(parseFloat(e.target.value))
  }



  return (
    <div>
      <Dialog open={open} onClose={cancel}>
        <DialogTitle style={{ margin: 'auto', textAlign: 'center' }}>Finalizar venda</DialogTitle>

        <DialogContent>
          <DialogContentText>Preencha com o nome do cliente:</DialogContentText>
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



          <br></br>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Conceder desconto:</InputLabel>
            <Input
              id="standard-adornment-amount"
              onKeyUp={darDesconto}
              defaultValue={0}
              startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            />
          </FormControl>

          <Stack style={{ padding: '15px', gap: '15px', display: 'none' }} direction={'row'}>
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
        <hr />
        <DialogTitle style={{ gap: '50px', textAlign: 'center' }}> <span style={{ fontSize: '3rem', color: 'silver', fontWeight: 'bold', fontSize: '2rem' }}><del>R$ {parseFloat(totalOrder).toFixed(2)}</del></span> <span style={{ fontSize: '2.5rem', color: 'red', fontWeight: 'bold' }}>  R$ {(parseFloat(totalOrder) - desconto).toFixed(2)}</span></DialogTitle>
        <DialogActions>
          <Button onClick={cancel}>Cancelar</Button>
          <Button onClick={() => fecharPedido(name, email, desconto)}>Finalizar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
