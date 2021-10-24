import React, { ReactNode } from 'react'
import { Box } from '@mui/material';


interface PanelInnerProps {
  children: ReactNode;
}

const PanelInner = ({ children }: PanelInnerProps) => {
  return (
    <Box
      component="div"
      sx={{
        height: "100%",
        px: 3,
        py: 4,
        overflow: "auto"
      }}
    >
      {children}
    </Box>
  )
}

export default PanelInner
