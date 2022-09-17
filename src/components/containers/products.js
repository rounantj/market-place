import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import ProductList from '../lists/productList'
import RebootDataGrid from '../tables/dataGrid'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2'
import { Divider } from '@mui/material'
import InputSearchNative from '../inputs/InputSearchNative'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SublinhedModal from '../modals/modalSublinhed'
import { API } from '../../hooks'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'right',
  alignItems: 'right',
  color: theme.palette.text.secondary,
}))

export default function Products() {
  const [showModal, setShowModal] = React.useState(false)
  const [productList, setProductList] = React.useState()
  const [product, setProduct] = React.useState()
  const [list, setList] = React.useState()
  const [api, setApi] = React.useState(null)

  async function handleModal(productGet) {
    if (productGet) {
      await setProduct(productGet)
    }
    setShowModal(!showModal)
  }

  async function createProduct(product) {
    const data = await api.createProduct(product)
    console.log(data)
    getProductList()
    handleModal()
  }

  async function updateProduct(product) {
    const data = await api.updateProduct(product)
    console.log(data)
    getProductList()
    handleModal()
  }

  async function reactiveProduct(product) {
    product = { ...product, status: 1 }
    const data = await api.updateProduct(product)
    console.log(data)
    getProductList()
  }

  React.useEffect(() => {
    const api2 = new API(
      sessionStorage.getItem('companyId'),
      sessionStorage.getItem('userToken')
    )
    setApi(api2)
  }, [])

  React.useEffect(() => {
    console.log('api', api)
    getProductList()
  }, [api])

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

  return (
    <>
      <Box>
        <Box>
          <Grid>
            <Item style={{ padding: '25px' }}>
              <Button
                onClick={() => handleModal()}
                style={{ float: 'right' }}
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
              >
                Cadastrar
              </Button>
              <Stack direction="row" style={{ textAlign: 'right' }} spacing={2}>
                <InputSearchNative onKeyUp={search} placeholder={'Pesquisa'} />
              </Stack>
            </Item>
          </Grid>
        </Box>
        <Divider></Divider>
        <ProductList
          reactiveProduct={reactiveProduct}
          handleModal={handleModal}
          listDataNew={list}
        />
      </Box>
      {showModal ? (
        <SublinhedModal
          product={product}
          createProduct={createProduct}
          updateProduct={updateProduct}
          handleModal={handleModal}
        />
      ) : (
        <></>
      )}
    </>
  )
}
