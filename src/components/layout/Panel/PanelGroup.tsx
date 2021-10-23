import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const PanelGroup = ({ children }: Props) => {
  return (
    <Box
      display="flex"
      height="100%"
      gap={6}
    >
      {children}
    </Box>
  )
}

export default PanelGroup
