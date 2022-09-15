import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import SearchInput from '../inputs/SearchInput'
import { Avatar } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ModalFullScreen({ open, handleClose }) {
  const [list, setList] = React.useState([
    {
      name: 'Primeiro produto da lista',
      price: 25.0,
      description: 'Produto inovador que só encontra em minha loja',
    },
    {
      name: 'Primeiro produto da lista',
      price: 25.0,
      description: 'Produto inovador que só encontra em minha loja',
    },
    {
      name: 'Primeiro produto da lista',
      price: 25.0,
      description: 'Produto inovador que só encontra em minha loja',
    },
    {
      name: 'Primeiro produto da lista',
      price: 25.0,
      description: 'Produto inovador que só encontra em minha loja',
    },
    {
      name: 'Primeiro produto da lista',
      price: 25.0,
      description: 'Produto inovador que só encontra em minha loja',
    },
    {
      name: 'Primeiro produto da lista',
      price: 25.0,
      description: 'Produto inovador que só encontra em minha loja',
    },
    {
      name: 'Primeiro produto da lista',
      price: 25.0,
      description: 'Produto inovador que só encontra em minha loja',
    },
  ])
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: 'relative' }}
          style={{ backgroundColor: 'black' }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              style={{ color: 'white', fontSize: '1.8rem' }}
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              <input
                style={{
                  width: '100%',
                  fontSize: '1.8rem',
                  background: 'white',
                  color: 'black',
                  border: 'none',
                  padding: '5px',
                }}
                type={'text'}
                placeholder={'Pesquise pela descrição do produto'}
              />
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Fechar
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {list.map((l) => (
            <>
              <ListItem button>
                <Avatar
                  alt={l.name}
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_n4wS-6wJRXXHUJ-r7N4VOfSaEjVMqdtquw&usqp=CAU'
                  }
                ></Avatar>
                <ListItemText primary={l.name} secondary={l.description} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Dialog>
    </div>
  )
}
