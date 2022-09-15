import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { ListItemIcon } from '@mui/material'
import styles from './Product.module.css'

export default function ProductList({ handleModal }) {
  const listData = [
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 1,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 2,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 3,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 4,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 5,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 6,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 7,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 8,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 9,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 10,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 1,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 2,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 3,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 4,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 5,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 6,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 7,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 8,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 9,
    },
    {
      name: 'Produto 01',
      total: 1,
      medida: 'pt',
      value: 2.5,
      id: 10,
    },
  ]

  function setViewModal(product) {
    console.log('Teste de click')
    window.scrollTo(0, 0)
    handleModal(product)
  }
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', padding: '50px' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            style={{ opacity: '0' }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
        </ListItemAvatar>
        <ListItemText
          style={{ width: '50%', textAlign: 'left' }}
          primary="Descrição do produto"
        />
        <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
          <span>Medida</span>
        </ListItemText>
        <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
          <span>Estoque</span>
        </ListItemText>
        <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
          <span>Valor</span>
        </ListItemText>
      </ListItem>
      {listData.map((item) => (
        <div>
          <ListItem
            onDoubleClick={() => setViewModal(item)}
            key={item.id}
            style={{ cursor: 'pointer' }}
            alignItems="flex-start"
            className={styles.itemProduct}
          >
            <ListItemAvatar>
              <Avatar
                alt={item.name}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_n4wS-6wJRXXHUJ-r7N4VOfSaEjVMqdtquw&usqp=CAU"
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
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {item.name}
                </React.Fragment>
              }
            />
            <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
              <span>{item.medida}</span>
            </ListItemText>
            <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
              <span>{item.total}</span>
            </ListItemText>
            <ListItemText style={{ minWidth: '100px', textAlign: 'right' }}>
              <span>R$ </span> <span>{item.value}</span>
            </ListItemText>
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  )
}
