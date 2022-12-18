import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { Stack } from '@mui/system'
import ConfirmationDelete from '../modals/confirmationDelete'
import ProductListOrder from '../lists/productListOrder'
import moment from 'moment'

import NormalButton from '../buttons/buttonNormal'
import SkeletonReboot from '../feedbacks/skeleton'

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

export default function RebootVerticalTabs({ data }) {
    const [value, setValue] = React.useState(0);
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = React.useState(false)






    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                {data.map((dt) => (
                    <Tab key={dt.id} label={dt.month} {...a11yProps(dt.id)} />
                ))}


            </Tabs>

            <TabPanel value={value} index={0}>

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
                                <div style={{ width: '10%', color: 'silver' }}>9</div>
                                <div style={{ width: '50%', textAlign: 'left' }}>
                                    TESTE
                                </div>
                                <div style={{ width: '30%' }}>
                                    R$ 900
                                </div>
                                <div style={{ width: '5%' }}>
                                    {moment(new Date()).format('DD/MM/YYYY \n\r HH:mm:ss')}
                                </div>
                                <div style={{ width: '15%', display: 'none' }}>
                                    { /*<NormalButton
                                callback={openModal}
                                pedido={dt}
                                deleteButton={true}
                                texto={`Excluir`}
    />*/}
                                </div>
                            </Stack>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/*  <ProductListOrder listDataNew={dt.products} />   */}
                    </AccordionDetails>
                </Accordion>



            </TabPanel>












        </Box>
    );
}