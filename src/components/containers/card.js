import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddButton from '../buttons/addButton'
import InputAdd from '../inputs/InputAdd'

export default function ProductCard({ product, quantidade, setQuantidade }) {
  React.useEffect(() => {
    console.log(product)
  }, [])
  return (
    <>
      {product ? (
        <Card style={{ margin: '20px auto' }} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="240"
            image={product.picture}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {product.ean}, {product.estoque} Un no estoque.
            </Typography>
            <Typography gutterBottom variant="h3" component="div">
              R${' '}
              <span style={{ color: 'black' }}>
                {product.value.toFixed(2).toLocaleString()}
              </span>
            </Typography>
          </CardContent>
          <CardActions>
            <InputAdd setQuantidade={setQuantidade} quantidade={quantidade} />
            <AddButton />
          </CardActions>
        </Card>
      ) : (
        <></>
      )}
    </>
  )
}
