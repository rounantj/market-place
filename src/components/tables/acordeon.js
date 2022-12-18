import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { Stack } from '@mui/system'
import { API } from '../../hooks'
import ProductListOrder from '../lists/productListOrder'
import moment from 'moment'
import { styled } from '@mui/material/styles'

import Paper from '@mui/material/Paper'
import { Divider } from '@mui/material'
import NormalButton from '../buttons/buttonNormal'
import ConfirmationDelete from '../modals/confirmationDelete'
import SkeletonReboot from '../feedbacks/skeleton'
import { OrdenaJson } from '../../helpers'
import RebootPagination from '../pagination/pagination'
import RebootVerticalTabs from '../tabs/verticalTabs'


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import SearchInput from '../inputs/SearchInput'


const Item2 = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function AcordeonData({ userName }) {
  const [expanded, setExpanded] = React.useState(false)
  const [orders, setOrders] = React.useState([])
  const [atualPedido, setAtualPedido] = React.useState({
    name: 'null',
    id: null,
  })
  const [open, setOpen] = React.useState(false)

  async function openModal(pedido) {
    setAtualPedido(pedido)
    setOpen(true)
    console.log('open', open, 'pedido', pedido)
  }
  function closeModal() {
    setOpen(false)
  }

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
  const [separatedOrders, setSeparatedOrders] = React.useState([])

  const [value, setValue] = React.useState(0);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };


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
    setOrders(OrdenaJson(newOrders, 'date', 'DESC'))
  }
  React.useEffect(() => {
    api2.config(
      sessionStorage.getItem('companyId'),
      sessionStorage.getItem('userToken')
    )
    setApi(api2)
    getMyOrders(api2)
  }, [])

  async function recall() {
    await setOrders([])
    api2.config(
      sessionStorage.getItem('companyId'),
      sessionStorage.getItem('userToken')
    )
    setApi(api2)
    getMyOrders(api2)
  }


  React.useEffect(() => {
    console.log('orders', orders)
    let news = []
    orders.map((dt, index) => {
      news.push(moment(dt.date).format("MM/YYYY")
      )
    })
    let months = [... new Set(news)]

    let novas = []
    months.map((m, index) => {
      novas.push({
        id: index,
        month: m,
        orders: orders.filter((o) => moment(o.date).format("MM/YYYY") === m)
      })
    })


    setSeparatedOrders(novas)



  }, [orders])

  function calculateValue(data) {
    let val = 0
    data.map((m) => {
      val += m.totalValue
    })
    return val
  }

  function labelMonth(text) {
    let months = {
      1: "JANEIRO",
      2: "FEVEREIRO",
      3: "MARCO",
      4: "ABRIL",
      5: "MAIO",
      6: "JUNHO",
      7: "JULHO",
      8: "AGOSTO",
      9: "SETEMBRO",
      10: "OUTUBRO",
      11: "NOVEMBRO",
      12: "DEZEMBRO",
    }

    return months[Number(text.split("/")[0])] + " / " + text.split("/")[1]
  }

  return (
    <div>
      <Typography>
        Resumo geral
      </Typography>

      <Divider />


      <Divider />




      <Stack direction={'row'}>
        <Item style={{ minWidth: '33.3%' }}>
          Usuário: {userName.toString()}
        </Item>
        <Item style={{ minWidth: '33.3%' }}>
          Total de pedidos: {orders.length} pedidos <Divider />
          Valor total: R$ {Number(getValor().toFixed(2)).toLocaleString()}
        </Item>

        <Item style={{ minWidth: '33.4%' }}>
          {' '}
          Data: {new Date().toLocaleDateString()}
        </Item>
      </Stack>
      <Divider />

      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '96vh', width: '100%' }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange2}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', minHeight: '96vh' }}
        >
          {separatedOrders.map((dt) => (
            <Tab key={dt.id} label={dt.month} {...a11yProps(dt.id)} />
          ))}


        </Tabs>



        {separatedOrders.map((dto) => (
          <TabPanel sx={{ Height: '65vh', maxHeight: '68vh', overflow: 'auto', Width: '120%' }} key={dto.id} value={value} index={dto.id}>
            <div style={{ width: '120%' }}>
              <Box sx={{ width: 1 }}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                  <Box gridColumn="span 4">
                    <Item2>
                      <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold' }}> {labelMonth(dto.month)}</Typography>
                    </Item2>
                  </Box>
                  <Box gridColumn="span 4">
                    <Item2>
                      <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        R$ {Number(calculateValue(dto.orders).toFixed(2)).toLocaleString()}
                      </Typography>
                    </Item2>
                  </Box>

                  <Box gridColumn="span 4">
                    <Item2>
                      <Typography style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {dto.orders.length} Pedidos
                      </Typography>
                    </Item2>
                  </Box>
                </Box>
              </Box>

              <br></br>

              <Divider />
              <Accordion
                expanded={expanded === 'panel0'}
                onChange={handleChange('panel0')}
                style={{ width: '100%', maxHeight: '96vh', overflow: 'auto' }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4bh-content"
                  id="panel4bh-header"
                >
                  <Typography sx={{ width: '100%', zoom: '80%', flexShrink: 0 }}>
                    <Stack direction={'row'}>
                      <div style={{ width: '10%', color: 'blue' }}>Número</div>
                      <div style={{ width: '45%', textAlign: 'left', color: 'blue' }}>
                        Cliente
                      </div>
                      <div style={{ width: '30%', color: 'blue' }}>Valor do Pedido</div>
                      <div style={{ width: '10%', color: 'blue' }}>Data</div>
                      <div style={{ width: '15%', color: 'blue' }}>Ação</div>
                    </Stack>
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </div>

            <div style={{ width: '120%', maxHeight: '96vh', zoom: '80%', overflow: 'auto' }}>
              {dto.orders.length > 0 ? (
                dto.orders.map((dt) => (
                  <Accordion
                    key={dt.id}
                    style={{ width: '100%', maxHeight: '96vh', overflow: 'auto' }}
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
                          <div style={{ width: '45%', textAlign: 'left' }}>
                            {dt.name}
                          </div>
                          <div style={{ width: '30%' }}>
                            R$ {dt.totalValue.toFixed(2).toLocaleString()}
                          </div>
                          <div style={{ width: '10%' }}>
                            {moment(dt.date).format('DD/MM/YYYY \n\r HH:mm:ss')}
                          </div>
                          <div style={{ width: '15%' }}>
                            <NormalButton
                              callback={openModal}
                              pedido={dt}
                              deleteButton={true}
                              texto={`Excluir`}
                            />
                          </div>
                        </Stack>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ProductListOrder listDataNew={dt.products} />
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <SkeletonReboot />
              )}
            </div>






          </TabPanel>
        ))}













      </Box>


      <ConfirmationDelete
        open={open}
        cancel={closeModal}
        pedido={atualPedido}
        returnCall={recall}
      />
    </div>
  )
}
