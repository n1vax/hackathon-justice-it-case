import { Box } from '@mui/system'
import React, { ReactNode } from 'react'
import { grey } from '@mui/material/colors';
import { BoxProps, Paper } from '@mui/material';
import { styled } from '@mui/system';
import classNames from "classnames";

interface PanelInnerProps {
  children: ReactNode;
}

const PanelInner = ({ children }: PanelInnerProps) => {
  return (
    <Box
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
