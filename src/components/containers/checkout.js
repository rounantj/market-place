import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import CheckboxList from '../lists/list'

import ProductCard from './card'
import BarcodeSearch from '../inputs/BarcodeSearch'
import SearchButton from '../buttons/searchButton'
import FinishButton from '../buttons/finishButton'
import ModalFullScreen from '../modals/modalFullScreen'
import { API } from '../../hooks'
import RebootAlert from '../modals/alert'
import Confirmation from '../modals/confirmation'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Checkout() {
  const [openModal, setOpenModal] = React.useState(false)
  const [showConfirmation, setShowConfirmation] = React.useState(false)
  const [totalOrder, setTotalOrder] = React.useState(0)
  const [alert, setAlert] = React.useState(false)
  const [type, setType] = React.useState('success')
  const [text, setText] = React.useState('Pedido realizado com sucesso!')

  const alertar = async (type, text) => {
    await setText(text)
    await setType(type)
    await setAlert(true)
  }

  const [produto, setProduto] = React.useState({
    name: '',
    id: null,
    value: 0,
    picture: 'images/12.png',
    ean: 'XXXXXXXXXXXXXXXXX',
    estoque: 0,
  })
  const [quantidade, setQuantidade] = React.useState(1)
  const [orderList, setOrderList] = React.useState([])

  const handleClickOpen = () => {
    setOpenModal(true)
  }

  async function removeItems(array) {
    let newList = orderList
    if (newList) {
      for (const k in array) {
        newList = newList.filter((l) => l.id !== array[k])
      }
      console.log(newList)
    }
    setOrderList(newList)
    let myTotal = 0
    for (const k in newList) {
      myTotal += newList[k].quantidade * newList[k].value
    }
    console.log(orderList)
    setTotalOrder(myTotal)
  }

  async function addToList() {
    await setProduto({
      ...produto,
      quantidade,
    })
    let newList = orderList
    let prd = newList.find((p) => p.id === produto.id)
    if (prd) {
      prd.quantidade = quantidade + prd.quantidade
      for (const k in newList) {
        if (prd.id === newList[k].id) {
          newList[k].quantidade = prd.quantidade
        }
      }
    } else {
      newList.push({
        ...produto,
        quantidade,
      })

      await setOrderList(newList)
      await setQuantidade(1)
      let myTotal = 0
      for (const k in newList) {
        myTotal += newList[k].quantidade * newList[k].value
      }
      console.log(orderList)
      setTotalOrder(myTotal)
    }

    let myTotal = 0
    for (const k in newList) {
      myTotal += newList[k].quantidade * newList[k].value
    }
    console.log(orderList)
    setTotalOrder(myTotal)
  }

  const handleClose = () => {
    setOpenModal(false)
  }
  const [api, setApi] = React.useState(null)

  async function finish() {
    setShowConfirmation(true)
  }
  async function fecharPedido(name, email, discount) {
    console.log('fechar pedido', name, email)
    const dados = await api.createOrder({
      name: name,
      clientId: 1,
      userId: 1,
      discount: discount,
      products: JSON.stringify(orderList),
    })

    await setProduto({
      name: '',
      id: null,
      value: 0,
      picture: 'images/12.png',
      ean: 'XXXXXXXXXXXXXXXXX',
      estoque: 0,
    })
    await setOrderList([])
    console.log(dados)
    setShowConfirmation(false)
    alertar('success', 'Pedido realizado com sucesso para: ' + name)
    setTimeout(() => {
      setAlert(false)
    }, 15000)
  }

  let api2 = new API()
  React.useEffect(() => {
    api2.config(
      sessionStorage.getItem('companyId'),
      sessionStorage.getItem('userToken')
    )
    setApi(api2)
  })

  React.useEffect(() => {
    console.log('mudou quantidade', quantidade)
  }, [quantidade])
  function handleConfirmation() {
    setShowConfirmation(!showConfirmation)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      {alert ? <RebootAlert type={type} text={text} /> : <></>}
      <Grid container spacing={2}>
        <Grid xs={6} md={12}>
          <Item>
            <Grid container spacing={2}>
              <Grid xs={6} md={6}>
                <h1>Checkout</h1>
              </Grid>
              <Grid xs={6} md={6}>
                <SearchButton handleClickOpen={handleClickOpen} />
              </Grid>
            </Grid>
          </Item>
        </Grid>

        <Grid xs={6} md={6}>
          <Item style={{ minHeight: '45vh' }}>
            <ProductCard
              product={produto}
              setQuantidade={setQuantidade}
              quantidade={quantidade}
              addToList={addToList}
            />
            <BarcodeSearch
              setProduct={setProduto}
              textHelper={'CÓDIGO DE BARRAS'}
            />
          </Item>
        </Grid>
        <Grid xs={6} md={6}>
          <Item style={{ minHeight: '70vh', background: '#fbfbec' }}>
            <h3>CUPON NÃO FISCAL</h3>
            <CheckboxList removeItems={removeItems} listData={orderList} />
          </Item>
        </Grid>
        <Grid xs={6} md={8}>
          <FinishButton finish={finish} />
        </Grid>
        <Grid xs={6} md={4}>
          <Item>
            <h1>
              Total:{' '}
              <span style={{ color: 'red' }}>
                R$ {totalOrder.toFixed(2).toLocaleString()}
              </span>
            </h1>
          </Item>
        </Grid>
      </Grid>
      <ModalFullScreen
        setProduto={setProduto}
        open={openModal}
        handleClose={handleClose}
      />
      {showConfirmation ? (
        <Confirmation
          open={showConfirmation}
          totalOrder={totalOrder}
          fecharPedido={fecharPedido}
          cancel={handleConfirmation}
        />
      ) : (
        <></>
      )}
    </Box>
  )
}
