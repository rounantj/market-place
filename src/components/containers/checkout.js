import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import CheckboxList from '../lists/list'
import SearchInput from '../inputs/SearchInput'
import ProductCard from './card'
import BarcodeSearch from '../inputs/BarcodeSearch'
import SearchButton from '../buttons/searchButton'
import FinishButton from '../buttons/finishButton'
import ModalFullScreen from '../modals/modalFullScreen'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function Checkout() {
  const [openModal, setOpenModal] = React.useState(false)
  const [produto, setProduto] = React.useState({})
  const [quantidade, setQuantidade] = React.useState(1)

  const handleClickOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Item style={{ minHeight: '65vh' }}>
            <ProductCard
              setQuantidade={setQuantidade}
              quantidade={quantidade}
            />
            <BarcodeSearch textHelper={'CÓDIGO DE BARRAS'} />
          </Item>
        </Grid>
        <Grid xs={6} md={6}>
          <Item style={{ minHeight: '65vh', background: '#fbfbec' }}>
            <h3>CUPON NÃO FISCAL</h3>
            <CheckboxList
              listData={[
                {
                  name: 'Produto 01',
                  total: 1,
                  medida: 'pt',
                  value: 2.5,
                  id: 1,
                },
                {
                  name: 'Produto 01',
                  total: 1,
                  medida: 'pt',
                  value: 2.5,
                  id: 2,
                },
                {
                  name: 'Produto 01',
                  total: 1,
                  medida: 'pt',
                  value: 2.5,
                  id: 3,
                },
                {
                  name: 'Produto 01',
                  total: 1,
                  medida: 'pt',
                  value: 2.5,
                  id: 4,
                },
              ]}
            />
          </Item>
        </Grid>
        <Grid xs={6} md={8}>
          <FinishButton />
        </Grid>
        <Grid xs={6} md={4}>
          <Item>
            <h1>
              Total:{' '}
              <span style={{ color: 'red' }}>
                R$ {(500.0).toFixed(2).toLocaleString()}
              </span>
            </h1>
          </Item>
        </Grid>
      </Grid>
      <ModalFullScreen open={openModal} handleClose={handleClose} />
    </Box>
  )
}
