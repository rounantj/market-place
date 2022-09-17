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
import { API } from '../../hooks'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ModalFullScreen({ open, handleClose }) {
  const [productList, setProductList] = React.useState()
  const [list, setList] = React.useState([])

  let api = new API()
  React.useEffect(() => {
    api.config(
      sessionStorage.getItem('companyId'),
      sessionStorage.getItem('userToken')
    )
    getProductList()
  }, [])

  async function getProductList() {
    const data = await api.getProducts()
    console.log(data)
    setProductList(data.data.products)
    setList(data.data.products)
    console.log(data)
  }

  async function search(keyword) {
    keyword = keyword.toLowerCase()
    setList(
      productList.filter(
        (prd) =>
          prd.name.toLowerCase().indexOf(keyword) > -1 ||
          prd.ean.toLowerCase().indexOf(keyword) > -1 ||
          prd.picture.toLowerCase().indexOf(keyword) > -1
      )
    )
  }

  React.useEffect(() => {
    console.log('productList', productList)
  }, [productList])

  const buscar = (e) => {
    search(e.target.value)
  }
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
                onKeyUp={buscar}
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
          {list.map((l, index) => (
            <div key={index}>
              <ListItem button>
                <Avatar
                  alt={l.name}
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_n4wS-6wJRXXHUJ-r7N4VOfSaEjVMqdtquw&usqp=CAU'
                  }
                ></Avatar>
                <ListItemText primary={l.value} secondary={l.ean} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Dialog>
    </div>
  )
}
