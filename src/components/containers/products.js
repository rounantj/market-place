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
  function handleModal() {
    setShowModal(!showModal)
  }
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
                <InputSearchNative placeholder={'Pesquisa'} />
              </Stack>
            </Item>
          </Grid>
        </Box>
        <Divider></Divider>
        <ProductList handleModal={handleModal} />
      </Box>
      {showModal ? <SublinhedModal handleModal={handleModal} /> : <></>}
    </>
  )
}
