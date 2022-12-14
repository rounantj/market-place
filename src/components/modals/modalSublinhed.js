import * as React from 'react'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import FilledInput from '@mui/material/FilledInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { Button, Divider, Paper } from '@mui/material'

import Stack from '@mui/material/Stack'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import CancelIcon from '@mui/icons-material/Cancel'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import InputFileReboot from '../inputs/FIle'
import ENVs from '../../providers/env.json'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ConfirmationDeleteProduct from './confirmationDeleteProduct'

export default function SublinhedModal({
  handleModal,
  product,
  createProduct,
  deleteProduct,
  updateProduct,
}) {
  const rootRef = React.useRef(null)
  const [thisProduct, setThisProduct] = React.useState(product)
  const [newItem, setNewItem] = React.useState(false)

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  async function crudProduct() {
    if (newItem) {
      await createProduct(thisProduct)
    } else {
      await updateProduct(thisProduct)
    }
  }
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false)
  async function deleteProductIn() {
    if (newItem) {
      handleModal()
    } else {
      await deleteProduct({ ...thisProduct })
    }
  }

  function closeModal() {
    setOpenConfirmDelete(false)
  }

  async function disableProduct() {
    if (newItem) {
      handleModal()
    } else {
      await updateProduct({ ...thisProduct, status: 0 })
    }
  }

  const setCode = async (e) => {
    await setThisProduct({
      ...thisProduct,
      ean: e.target.value,
    })
  }

  const setValue = async (e) => {
    await setThisProduct({
      ...thisProduct,
      value: Number(e.target.value),
    })
  }

  const setEstoque = async (e) => {
    await setThisProduct({
      ...thisProduct,
      estoque: Number(e.target.value),
    })
  }

  const setName = async (e) => {
    await setThisProduct({
      ...thisProduct,
      name: e.target.value,
    })
  }

  async function setPicture(e) {
    await setThisProduct({
      ...thisProduct,
      picture: e,
    })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  React.useEffect(() => {
    if (!product) {
      setThisProduct({
        categoryId: 1,
        ean: '',
        lang: 'pt-BR',
        name: '',
        picture: '',
        slug: '',
        status: 1,
        estoque: 0,
        value: 0,
      })
      setNewItem(true)
    } else {
      setThisProduct(product)
    }
  }, [])

  React.useEffect(() => {
    console.log('thisProduct', thisProduct)
  }, [thisProduct])

  return (
    <>
      {thisProduct ? (
        <Modal
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          sx={{
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            p: 1,
            justifyContent: 'center',
          }}
          container={() => rootRef.current}
        >
          <Box
            sx={{
              position: 'relative',

              width: 800,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: (theme) => theme.shadows[5],
              p: 4,
            }}
          >
            <h3 style={{ textAlign: 'center' }}>Cadastro de produto</h3>
            <HighlightOffIcon
              onClick={() => handleModal()}
              style={{
                position: 'absolute',
                cursor: 'pointer',
                fontSize: '30px',
                top: '25px',
                right: '25px',
              }}
            />

            <Stack direction={'row'}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box style={{ margin: 'auto', width: '100%' }}>
                  <img
                    src={`${ENVs.IMAGES_REPO}${thisProduct.picture}`}
                    style={{
                      width: '300px',
                      height: '250px',
                      border: '1px dashed silver',
                      padding: '15px',
                    }}
                  />
                  <InputFileReboot
                    setPicture={setPicture}
                    nameImage={`${ENVs.IMAGES_REPO}${thisProduct.picture}`}
                  />
                </Box>

                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-amount">
                    Descri????o do produto
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-amount"
                    defaultValue={thisProduct.name}
                    onKeyUp={setName}
                  />
                </FormControl>

                <div>
                  <TextField
                    label="Valor do produto"
                    id="standard-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    defaultValue={thisProduct.value}
                    onKeyUp={setValue}
                    type={'number'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, mt: 3, width: '25ch' }}
                  >
                    <Input
                      id="standard-adornment-weight"
                      defaultValue={thisProduct.estoque}
                      onKeyUp={setEstoque}
                      type={'number'}
                      endAdornment={
                        <InputAdornment position="end">Un</InputAdornment>
                      }
                      aria-describedby="standard-weight-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                    <FormHelperText id="standard-weight-helper-text">
                      Estoque
                    </FormHelperText>
                  </FormControl>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel>C??digo de Barras</InputLabel>
                    <Input
                      type={'text'}
                      defaultValue={thisProduct.ean}
                      onKeyUp={setCode}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle  visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            <ViewWeekIcon
                              sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </Box>
            </Stack>
            <Divider />
            <Stack
              style={{
                paddingTop: '15px',
                gap: '15px',
                width: '80%',
                float: 'right',
              }}
              direction={'row'}
            >
              <br />
              <Button
                onClick={() => setOpenConfirmDelete(true)}
                color={'error'}
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                DELETAR
              </Button>
              <Button
                color={'warning'}
                variant="outlined"
                onClick={handleModal}
                startIcon={<CancelIcon />}
              >
                CANCELAR
              </Button>
              <Button
                onClick={disableProduct}
                color={'error'}
                variant="outlined"
                startIcon={<RemoveCircleOutlineIcon />}
              >
                DESATIVAR
              </Button>

              <Button
                onClick={crudProduct}
                variant="contained"
                endIcon={<SaveAsIcon />}
              >
                SALVAR
              </Button>
            </Stack>
          </Box>
        </Modal>
      ) : (
        <></>
      )}
      <ConfirmationDeleteProduct open={openConfirmDelete} product={thisProduct} returnCall={deleteProductIn} cancel={closeModal} />
    </>
  )
}
