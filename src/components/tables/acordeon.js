import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import dataTest from './dataExampleSells.json'
import ProductList from '../lists/productList'
import { Stack } from '@mui/system'
import { API } from '../../hooks'
import ProductListOrder from '../lists/productListOrder'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2'
import { Divider } from '@mui/material'
import { useGridApiEventHandler } from '@mui/x-data-grid'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function AcordeonData() {
  const [expanded, setExpanded] = React.useState(false)
  const [orders, setOrders] = React.useState([])

  function getValor() {
    let a = 0
    for (const k in orders) {
      a += orders[k].totalValue
    }

    return a
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const desc = { fontSize: 'bold', color: 'black' }
  const [api, setApi] = React.useState(null)

  let api2 = new API()

  async function getMyOrders(api) {
    const dados = await api.getOrders()
    console.log(dados)

    let dataOrders = dados.data.order,
      newOrders = []

    for (const k in dataOrders) {
      let prds = JSON.parse(dataOrders[k].products)
      let total = 0
      for (const a in prds) {
        total += prds[a].quantidade * prds[a].value
      }
      newOrders.push({
        id: dataOrders[k].id,
        name: dataOrders[k].name,
        totalValue: total,
        date: dataOrders[k].createdAt,
        products: prds,
      })
    }
    setOrders(newOrders)
  }
  React.useEffect(() => {
    api2.config(
      sessionStorage.getItem('companyId'),
      sessionStorage.getItem('userToken')
    )
    setApi(api2)
    getMyOrders(api2)
  }, [])

  return (
    <div>
      <Stack direction={'row'}>
        <Item style={{ minWidth: '33.3%' }}>
          Usuário: {'Ronan Rodrigues'.toString()}
        </Item>
        <Item style={{ minWidth: '33.3%' }}>
          Total de pedidos: {orders.length} pedidos <Divider />
          Valor total: R$ {getValor().toFixed(2)}
        </Item>

        <Item style={{ minWidth: '33.4%' }}>
          {' '}
          Data: {new Date().toLocaleDateString()}
        </Item>
      </Stack>
      <Divider />
      <Accordion
        expanded={expanded === 'panel0'}
        onChange={handleChange('panel0')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            <Stack direction={'row'}>
              <div style={{ width: '10%', color: 'blue' }}>Número</div>
              <div style={{ width: '50%', textAlign: 'left', color: 'blue' }}>
                Cliente
              </div>
              <div style={{ width: '30%', color: 'blue' }}>Valor do Pedido</div>
              <div style={{ width: '20%', color: 'blue' }}>Data</div>
            </Stack>
          </Typography>
        </AccordionSummary>
      </Accordion>
      {orders.map((dt) => (
        <Accordion
          key={dt.id}
          expanded={expanded === 'panel' + dt.id}
          onChange={handleChange('panel' + dt.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: '100%', flexShrink: 0 }}>
              <Stack direction={'row'}>
                <div style={{ width: '10%', color: 'silver' }}>{dt.id}</div>
                <div style={{ width: '50%', textAlign: 'left' }}>{dt.name}</div>
                <div style={{ width: '30%' }}>
                  R$ {dt.totalValue.toFixed(2).toLocaleString()}
                </div>
                <div style={{ width: '20%' }}>{dt.date}</div>
              </Stack>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProductListOrder listDataNew={dt.products} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
