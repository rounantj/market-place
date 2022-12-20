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

export default function ConfirmationDeleteProduct({
  product,
  cancel,
  open,
  returnCall,
}) {

  async function excluir(produto) {
    await returnCall(product)
    cancel()
  }

  return (
    <div>
      <Dialog open={open} onClose={cancel}>
        <DialogTitle>Atenção!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja excluir o produto {`${product?.id}: ${product?.name} ?`}{' '}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Cancelar</Button>
          <Button onClick={() => excluir(product)}>
            Sim, Excluir!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
