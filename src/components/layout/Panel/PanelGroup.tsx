import { Box } from '@mui/system'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
  vertical?: boolean;
  gap?: number | string;
}

const PanelGroup = ({ children, vertical, gap }: Props) => {
  return (
    <Box
      width="100%"
      flexDirection={vertical ? "column" : "row"}
      display="flex"
      height="100%"
      gap={gap}
    >
      {children}
    </Box>
  )
}

export default PanelGroup
