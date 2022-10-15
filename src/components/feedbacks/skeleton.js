import * as React from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export default function SkeletonReboot() {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton style={{ height: '100px' }} />
      <Skeleton style={{ height: '100px' }} animation="wave" />
      <Skeleton style={{ height: '100px' }} animation={false} />
      <Skeleton style={{ height: '100px' }} />
      <Skeleton style={{ height: '100px' }} animation="wave" />
      <Skeleton style={{ height: '100px' }} animation={false} />
      <Skeleton style={{ height: '100px' }} />
      <Skeleton style={{ height: '100px' }} animation="wave" />
      <Skeleton style={{ height: '100px' }} animation={false} />
      <Skeleton style={{ height: '100px' }} />
      <Skeleton style={{ height: '100px' }} animation="wave" />
      <Skeleton style={{ height: '100px' }} animation={false} />
      <Skeleton style={{ height: '100px' }} />
      <Skeleton style={{ height: '100px' }} animation="wave" />
      <Skeleton style={{ height: '100px' }} animation={false} />
    </Box>
  )
}
