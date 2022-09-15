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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'right',
  alignItems: 'right',
  color: theme.palette.text.secondary,
}))

export default function SublinhedModal({ handleModal, product }) {
  const rootRef = React.useRef(null)
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

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

  return (
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
                src={'/12.png'}
                style={{
                  width: '300px',
                  height: '250px',
                  border: '1px dashed silver',
                  padding: '15px',
                }}
              />
            </Box>

            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">
                Descrição do produto
              </InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={values.amount}
                onChange={handleChange('amount')}
              />
            </FormControl>

            <div>
              <TextField
                label="Valor do produto"
                id="standard-start-adornment"
                sx={{ m: 1, width: '25ch' }}
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
                  value={300}
                  onChange={handleChange('weight')}
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
                  value={'123456487987'}
                  onChange={handleChange('barcode')}
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
            startIcon={<CancelIcon />}
          >
            CANCELAR
          </Button>
          <Button color={'error'} variant="outlined" startIcon={<DeleteIcon />}>
            DELETAR
          </Button>
          <Button variant="contained" endIcon={<SaveAsIcon />}>
            SALVAR
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}
