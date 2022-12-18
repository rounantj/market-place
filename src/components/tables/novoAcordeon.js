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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))

export default function listOrders({ userName, orders }) {
    const [expanded, setExpanded] = React.useState(false)
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
                            <div style={{ width: '5%', color: 'blue' }}>Data</div>
                            <div style={{ width: '15%', color: 'blue' }}>Ação</div>
                        </Stack>
                    </Typography>
                </AccordionSummary>
            </Accordion>
            {orders.length > 0 ? (
                orders.map((dt) => (
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
                                    <div style={{ width: '50%', textAlign: 'left' }}>
                                        {dt.name}
                                    </div>
                                    <div style={{ width: '30%' }}>
                                        R$ {dt.totalValue.toFixed(2).toLocaleString()}
                                    </div>
                                    <div style={{ width: '5%' }}>
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

            <ConfirmationDelete
                open={open}
                cancel={closeModal}
                pedido={atualPedido}
                returnCall={recall}
            />
        </div>
    )
}
