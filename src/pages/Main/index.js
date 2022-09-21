import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'

import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import RebootTable from '../../components/tables/defaultTable'
import headCells from '../../components/tables/headerCellsExample.json'
import rows from '../../components/tables/dataExample.json'
import Checkout from '../../components/containers/checkout'

import AccountCircle from '@mui/icons-material/AccountCircle'

import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Products from '../../components/containers/products'
import AcordeonData from '../../components/tables/acordeon'
import Login from '../login'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

export default function App() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const contentsAdmin = ['Produtos', 'Vendas', 'Checkout']
  const contents = ['Vendas', 'Checkout']
  const [useContent, setUseContent] = React.useState([])
  const [contentShow, setContentShow] = React.useState('Checkout')
  const [userName, setUserName] = React.useState('System')

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleExit = () => {
    sessionStorage.clear()
    window.location.reload()
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  function handleContent(e) {
    setContentShow(e)
  }

  React.useEffect(() => {
    let token = sessionStorage.getItem('userToken')
    let userTxt = sessionStorage.getItem('@user:')
    let USER = {}
    if (userTxt) {
      USER = JSON.parse(userTxt)
      if (USER.roleId === 3) {
        setUseContent(contents)
      } else {
        setUseContent(contentsAdmin)
      }
      setUserName(USER.name)
    }
    if (!token) {
      window.location.replace('Login')
    }
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{ backgroundColor: 'black' }} position="fixed" open={open}>
        <Toolbar style={{ width: '100%', display: 'inline-block' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            style={{ float: 'left', margin: '10px auto' }}
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <img
            width={50}
            height={50}
            src={'/12.png'}
            style={{
              position: 'absolute',
              top: '10px',
              left: 'calc(50% - 50px)',
            }}
          />
          <div
            style={{ float: 'right', maxWidth: '50px', margin: '10px auto' }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              style={{ float: 'right', maxWidth: '50px' }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Minha Conta</MenuItem>
              <MenuItem onClick={handleExit}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {useContent.map((text, index) => (
            <ListItem
              onClick={() => handleContent(text)}
              key={text}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>

                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main
        style={{ minHeight: '100vh', backgroundColor: '#f9f8fb' }}
        open={open}
      >
        <DrawerHeader />
        {contentShow === 'Vendas' ? (
          <div>
            <h1>{contentShow}</h1>
            <AcordeonData userName={}/>
          </div>
        ) : contentShow === 'Produtos' ? (
          <>
            <h1>{contentShow}</h1>
            <Products />
          </>
        ) : contentShow === 'Clientes' ? (
          <div>
            <h1>{contentShow}</h1>
            <RebootTable rows={rows} headCells={headCells} />
          </div>
        ) : contentShow === 'Indicadores' ? (
          <h1>{contentShow}</h1>
        ) : contentShow === 'Checkout' ? (
          <div>
            <Checkout />
          </div>
        ) : (
          <h1>Not found</h1>
        )}
      </Main>
    </Box>
  )
}
