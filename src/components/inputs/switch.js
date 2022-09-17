import * as React from 'react'
import Switch from '@mui/material/Switch'

export default function SwitchReboot({ setOk }) {
  return (
    <div>
      <Switch onChange={setOk} />
    </div>
  )
}
