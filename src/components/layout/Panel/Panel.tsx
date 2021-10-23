
import Card from '@mui/material/Card';
import React, { ReactNode } from 'react'
import { grey } from '@mui/material/colors';


interface PanelProps {
  children: ReactNode
}

const Panel = ({ children }: PanelProps) => {
  return (
    <Card
      height="100%"
      width="100%"
      borderRadius={5}
    // overflow="hidden"
    // elevation={4}
    // bgcolor={grey[200]}
    >
      {children}
    </Card>
  )
}

export default Panel
