import { Box } from '@mui/system'
import React, { ReactNode } from 'react'
import { grey } from '@mui/material/colors';
import { BoxProps, Paper } from '@mui/material';
import { styled } from '@mui/system';
import classNames from "classnames";

interface PanelProps {
  children: ReactNode;
  height?: string
}

const Panel = ({ children, height = "100%" }: PanelProps) => {
  return (
    <Box
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
