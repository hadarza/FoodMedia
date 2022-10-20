import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonCarosuel = () => {
  return (
    <div className='card-carosuel'>
        <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton variant="rectangular" width='100%' height={200} />

    </Stack>
  </div>
  )
}

export default SkeletonCarosuel