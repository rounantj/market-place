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
import OutlinedInput from '@mui/material/OutlinedInput'
import { Button, Divider, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { RebootApi } from '../../providers'
import RebootAlert from '../modals/alert'
import { AirlineSeatLegroomExtraTwoTone } from '@mui/icons-material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import DeleteIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CancelIcon from '@mui/icons-material/Cancel'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import InputFileReboot from '../inputs/FIle'
import ENVs from '../../providers/env.json'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'right',
  alignItems: 'right',
  color: theme.palette.text.secondary,
}))

export default function SublinhedModal({
  handleModal,
  product,
  createProduct,
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

  async function deleteProduct() {
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
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
                    Descrição do produto
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
                    <InputLabel>Código de Barras</InputLabel>
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
                width: '50%',
                float: 'right',
              }}
              direction={'row'}
            >
              <br />
              <Button
                color={'warning'}
                variant="outlined"
                onClick={handleModal}
                startIcon={<CancelIcon />}
              >
                CANCELAR
              </Button>
              <Button
                onClick={deleteProduct}
                color={'error'}
                variant="outlined"
                startIcon={<DeleteIcon />}
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
    </>
  )
}
