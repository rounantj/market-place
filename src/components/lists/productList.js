import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import styles from './Product.module.css'
import ENVs from '../../providers/env.json'

export default function ProductList({
  handleModal,
  listDataNew,
  reactiveProduct,
}) {
  if (!listDataNew) {
    listDataNew = []
  }

  function setViewModal(product) {
    console.log('Teste de click')
    window.scrollTo(0, 0)
    console.log('lista', handleModal, product)
    handleModal(product)
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', padding: '50px' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            style={{ opacity: '0' }}
            alt="Remy Sharp"
            src={`${ENVs.IMAGES_REPO}images/dois.jpg`}
          />
        </ListItemAvatar>
        <ListItemText
          style={{ width: '50%', textAlign: 'left' }}
          primary="Descrição do produto"
        />
        <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
          <span>Código de Barras</span>
        </ListItemText>
        <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
          <span>Estoque</span>
        </ListItemText>
        <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
          <span>Valor</span>
        </ListItemText>
      </ListItem>
      {listDataNew.map((item) => (
        <div>
          <ListItem
            disabled={!item.status}
            onDoubleClick={() => setViewModal(item)}
            key={item.id}
            style={{ cursor: 'pointer' }}
            alignItems="flex-start"
            className={`${styles.itemProduct} ${
              item.status === 0 ? styles.inativo : ''
            }`}
          >
            <ListItemAvatar>
              <Avatar
                alt={item.name}
                src={`${ENVs.IMAGES_REPO}${item.picture}`}
              />
            </ListItemAvatar>
            <ListItemText
              style={{ width: '50%', textAlign: 'left' }}
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color={`${item.status === 0 ? 'red' : 'text.primary'}`}
                  >
                    {item.status === 1 ? 'PRODUTO ATIVO' : 'PRODUTO DESATIVADO'}
                  </Typography>
                  {'  '}
                  {item.ean}
                  {'  '}{' '}
                  {item.status === 0 ? (
                    <Button
                      variant="outlined"
                      onClick={() => reactiveProduct(item)}
                      color="success"
                    >
                      REATIVAR PRODUTO
                    </Button>
                  ) : (
                    <></>
                  )}
                </React.Fragment>
              }
            />

            <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
              <span>{item.ean}</span>
            </ListItemText>
            <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
              <span>{item.estoque} Un</span>
            </ListItemText>
            <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
              <span>R$ </span> <span>{item.value.toFixed(2)}</span>
            </ListItemText>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  )
}
