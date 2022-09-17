import * as React from 'react'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import ViewWeekIcon from '@mui/icons-material/ViewWeek'
import { API } from '../../hooks'

export default function BarcodeSearch({ textHelper, setProduct }) {
  const [api, setApi] = React.useState(null)
  React.useEffect(() => {
    const api2 = new API(
      sessionStorage.getItem('companyId'),
      sessionStorage.getItem('userToken')
    )
    setApi(api2)
  }, [])

  async function getByEan(ean) {
    const data = await api.getProducts(null, ean)
    console.log(data)
    setProduct(data.data.product)
  }
  const getProduct = async (e) => {
    console.log(e)
    if (e.code === 'Enter') {
      await getByEan(e.target.value)
      e.target.value = ''
    }
  }

  React.useEffect(() => {
    console.log('api', api)
  }, [api])
  return (
    <Box style={{ minWidth: '100%' }} sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <ViewWeekIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          style={{ fontSize: '4rem', width: '100%' }}
          focused={true}
          onKeyUp={getProduct}
          id="input-with-sx"
          label={textHelper}
          variant="standard"
        />
      </Box>
    </Box>
  )
}
