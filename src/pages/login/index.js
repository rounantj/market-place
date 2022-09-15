import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { Divider } from '@mui/material'
import StepsToRegister from '../../components/containers/stepsToRegister'
import FormLogin from '../../components/containers/FormLogin'
import { Image } from '@mui/icons-material'

export default function Login() {
  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    )
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  return (
    <Box>
      <img
        width={100}
        height={100}
        src={'/12.png'}
        style={{ position: 'absolute', top: '10px', left: 'calc(50% - 50px)' }}
      />
      <Paper
        style={{
          margin: '10vh auto',
          width: '100%',
          maxWidth: '700px',
          height: '80vh',
        }}
        elevation={3}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <Tabs
              value={value}
              sx={{ width: '100%', margin: 'auto' }}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab sx={{ width: '50%' }} label="Faça Login" {...a11yProps(0)} />
              <Tab
                sx={{ width: '50%' }}
                label="Registre-se"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <br />
            <br />
            <br />

            <FormLogin />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Registre-se em menos de 5 minutos!
            <br />
            <br />
            <Divider />
            <StepsToRegister />
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  )
}
