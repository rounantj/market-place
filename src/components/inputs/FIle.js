import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { FilledInput } from '@mui/material'
import { API } from '../../hooks'
import ENVs from '../../providers/env.json'

export default function InputFileReboot({ nameImage, setPicture }) {
  const [name, setName] = useState(nameImage)

  const uploadFile = async (e) => {
    console.log(e.target.files[0])
    const formData = new FormData()
    formData.append('avatar', e.target.files[0])
    const result = await api.uploadImage(formData)
    console.log(result)
    setName(`images/${result.data.file.filename}`)
    await setPicture(`images/${result.data.file.filename}`)
  }

  let api = new API()
  React.useEffect(() => {
    api.config(
      sessionStorage.getItem('companyId'),
      sessionStorage.getItem('userToken')
    )
  }, [])

  return (
    <div className="App">
      <h4>Altere a foto</h4>
      <form>
        <input
          style={{ display: 'none' }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <a href={name}>{name}</a>
        <Divider />

        <FilledInput type="file" onChange={uploadFile} />
      </form>
    </div>
  )
}
