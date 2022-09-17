import * as React from 'react'
import Box from '@mui/material/Box'
import FilledInput from '@mui/material/FilledInput'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { Button, Divider } from '@mui/material'
import Typography from '@mui/material/Typography'

import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { RebootApi } from '../../providers'
import RebootAlert from '../modals/alert'
import { AirlineSeatLegroomExtraTwoTone } from '@mui/icons-material'

export default function FormLogin() {
  const [email, setMail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [type, setType] = React.useState('success')
  const [text, setText] = React.useState('Login bem sucedido!')
  const [loading, setLoading] = React.useState(false)
  const [alert, setAlert] = React.useState(false)

  function handleClick() {
    setLoading(true)
    login()
  }

  const handleChange = (event) => {
    setMail(event.target.value)
  }

  const handleChangePass = (event) => {
    setPassword(event.target.value)
  }
  async function login() {
    RebootApi.post('/auth/login', {
      email,
      password,
    })
      .then((response) => {
        console.log(response)
        setLoading(false)
        if (response.status === 200) {
          console.log(response)
          alertar('success', 'Login bem sucedido!')
          sessionStorage.setItem('userToken', response.data.token)
          sessionStorage.setItem('companyId', response.data.user.companyId)

          setTimeout(() => {
            window.location.replace('/')
          }, 1000)
        } else {
          alertar('error', response.data.message)
        }
      })
      .catch((error) => {
        console.log('eresposta', error)
        setLoading(false)
        alertar('error', error.response.data.message)
      })
  }

  const alertar = async (type, text) => {
    await setText(text)
    await setType(type)
    await setAlert(true)
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      {alert ? <RebootAlert type={type} text={text} /> : <></>}
      <br />

      <FormControl style={{ width: '100%' }} variant="filled">
        <InputLabel
          style={{ width: '70%', marginLeft: '15%', textAlign: 'left' }}
          htmlFor="component-filled"
        >
          Name
        </InputLabel>
        <FilledInput
          style={{ width: '70%', margin: 'auto' }}
          id="component-filled"
          onChange={handleChange}
        />
      </FormControl>
      <br />
      <br />
      <br />
      <FormControl style={{ width: '100%' }} variant="filled">
        <InputLabel
          style={{ width: '70%', marginLeft: '15%', textAlign: 'left' }}
          htmlFor="component-filled"
        >
          Password
        </InputLabel>
        <FilledInput
          style={{ width: '70%', margin: 'auto' }}
          id="component-filled"
          type={'password'}
          onChange={handleChangePass}
        />
      </FormControl>
      <br />
      <br />

      <Button onClick={handleClick} style={{ gap: '15px' }} variant="outlined">
        {loading ? (
          <Stack sx={{ color: 'grey.500' }} spacing={1} direction="row">
            <CircularProgress color="inherit" />
          </Stack>
        ) : (
          <></>
        )}
        ENTRAR
      </Button>

      <br />
      <br />
      <Typography>
        <Divider />
        <Button variant="text">Esqueci minha senha!</Button>

        <Divider />
      </Typography>
    </Box>
  )
}
