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
import { API } from '../../hooks'

export default function ConfirmationDelete({
  pedido,
  cancel,
  open,
  returnCall,
}) {
  const [api, setApi] = React.useState(null)
  async function excluirPedido(id) {
    if (id === null) {
      alert('Pedido inválido')
    } else {
      await api.deleteOrder(pedido.id)
      await returnCall()
      cancel()
    }
  }
  let api2 = new API()
  React.useEffect(() => {
    api2.config(
      sessionStorage.getItem('companyId'),
      sessionStorage.getItem('userToken')
    )
    setApi(api2)
  })
  return (
    <div>
      <Dialog open={open} onClose={cancel}>
        <DialogTitle>Atenção!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja excluir o pedido {`${pedido.id} do(a) ${pedido.name} ?`}{' '}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Cancelar</Button>
          <Button onClick={() => excluirPedido(pedido.id)}>
            Sim, Excluir!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
