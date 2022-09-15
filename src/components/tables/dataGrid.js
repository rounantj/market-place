import * as React from 'react'
import { useDemoData } from '@mui/x-data-grid-generator'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

export default function RebootDataGrid() {
  const { data, loading } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 4,
    maxColumns: 6,
  })

  console.log('data', data)
  console.log('GridToolbar', GridToolbar)

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        {...data}
        loading={loading}
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  )
}
