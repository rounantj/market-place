import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import dataTest from './dataExampleSells.json'
import ProductList from '../lists/productList'
import { Stack } from '@mui/system'

export default function AcordeonData() {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const desc = { fontSize: 'bold', color: 'black' }

  return (
    <div>
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
      {dataTest.map((dt) => (
        <Accordion
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
            <ProductList listDataNew={dt.products} />
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
