import React, { ReactNode } from 'react'
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';

interface PanelProps {
  children: ReactNode;
  height?: string
}

const Panel = ({ children, height = "100%" }: PanelProps) => {
  return (
    <Box
      component="div"
      className="panel"
      sx={{
        zIndex: 1,
        position: "relative",
        bgcolor: grey[200],
        borderRadius: 2,
        overflow: "hidden",
        height
      }}
    >
      {children}
    </Box>
  )
}

export default Panel
