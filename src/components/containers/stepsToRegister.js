import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import FilledInput from '@mui/material/FilledInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'

import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'

const steps = [
  {
    label: 'Insira seu nome completo',
  },
  {
    label: 'Insira seu e-mail',
  },
  {
    label: 'Agora insira sua senha',
  },
  {
    label: 'Confirme o envio das informações!',
    description: `Após o envio dos dados iremos avaliar sua solicitação e liberar o acesso em até 24 horas se aprovado!`,
  },
]

export default function StepsToRegister() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [name, setName] = React.useState('')
  const [email, setMail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const handleNext = (index) => {
    if (index === 3) {
      setLoading(true)
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } else {
      setLoading(false)
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleChange = (event) => {
    setMail(event.target.value)
  }

  const handleChangePass = (event) => {
    setPassword(event.target.value)
  }

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption">Voltar</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.description ? (
                <Typography>{step.description}</Typography>
              ) : (
                <></>
              )}

              <FormControl style={{ width: '100%' }} variant="filled">
                <InputLabel
                  style={{ width: '70%', marginLeft: '15%', textAlign: 'left' }}
                  htmlFor="component-filled"
                >
                  {index === 0
                    ? 'Nome'
                    : index === 1
                    ? 'E-mail'
                    : index === 2
                    ? 'Senha'
                    : ''}
                </InputLabel>
                {index !== 3 ? (
                  <FilledInput
                    style={{ width: '70%', margin: 'auto' }}
                    id="component-filled"
                    type={
                      index === 0
                        ? 'text'
                        : index === 1
                        ? 'mail'
                        : index === 2
                        ? 'password'
                        : ''
                    }
                    value={
                      index === 0
                        ? name
                        : index === 1
                        ? email
                        : index === 2
                        ? password
                        : ''
                    }
                    onChange={
                      index === 0
                        ? handleName
                        : index === 1
                        ? handleChange
                        : index === 2
                        ? handleChangePass
                        : ''
                    }
                  />
                ) : (
                  <></>
                )}
              </FormControl>

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={() => handleNext(index)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {loading ? (
                      <Stack
                        sx={{ color: 'grey.500' }}
                        spacing={1}
                        direction="row"
                      >
                        <CircularProgress color="inherit" />
                      </Stack>
                    ) : (
                      <></>
                    )}
                    {index === steps.length - 1 ? 'Enviar Dados' : 'Continuar'}
                  </Button>

                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Voltar
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>
            Muito bom! - Você terminou seu registro com sucesso!
          </Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Criar outro registro
          </Button>
        </Paper>
      )}
    </Box>
  )
}
