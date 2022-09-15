import * as React from 'react'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import Stack from '@mui/material/Stack'

export default function SearchButton({ handleClickOpen }) {
  return (
    <Stack
      style={{ float: 'right', margin: '20px auto' }}
      direction="row"
      spacing={2}
    >
      <Button
        style={{ backgroundColor: 'lightgreen', color: 'black' }}
        onClick={handleClickOpen}
        variant="contained"
        endIcon={<SearchIcon />}
      >
        Encontre um produto pelo nome
      </Button>
    </Stack>
  )
}
