import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddButton from '../buttons/addButton'
import InputAdd from '../inputs/InputAdd'

export default function ProductCard({
  name,
  price,
  dedscription,
  setQuantidade,
  quantidade,
}) {
  return (
    <Card style={{ margin: '20px auto' }} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="240"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_n4wS-6wJRXXHUJ-r7N4VOfSaEjVMqdtquw&usqp=CAU"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Whey Protein
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Description of my product, and more pertinents infos
        </Typography>
        <Typography gutterBottom variant="h3" component="div">
          R${' '}
          <span style={{ color: 'black' }}>
            {(20.0).toFixed(2).toLocaleString()}
          </span>
        </Typography>
      </CardContent>
      <CardActions>
        <InputAdd setQuantidade={setQuantidade} quantidade={quantidade} />
        <AddButton />
      </CardActions>
    </Card>
  )
}
