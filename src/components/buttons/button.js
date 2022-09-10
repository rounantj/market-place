import * as React from 'react'
import Button from '@mui/material/Button'
import style from './Buttons.module.css'

export default function ButtonDefault({ text }) {
  return (
    <Button className={style['btn-main']} variant="contained">
      {text}
    </Button>
  )
}
