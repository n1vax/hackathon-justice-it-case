import { Box } from '@mui/system'
import React, { ReactNode } from 'react'
import { grey } from '@mui/material/colors';
import { BoxProps, Paper } from '@mui/material';
import { styled } from '@mui/system';


interface PanelProps {
  children: ReactNode;
  expanded?: boolean;
}

const Panel = ({ children, expanded }: PanelProps) => {
  return (
    // <Paper
    //   className="panel"
    //   sx={{
    //     width: { xl: expanded ? "100%" : "100px" },
    //     height: { xs: expanded ? "80vh" : "100px", xl: "auto" },
    //     borderRadius: 5,
    //     overflow: "hidden",
    //   }}
    // >
    //   {children}
    // </Paper>
    <Box
      className="panel"
      width={{ xl: expanded ? "100%" : "100px" }}
      height={{ xs: expanded ? "80vh" : "100px", xl: "auto" }}
      borderRadius={5}
      overflow="hidden"
      bgcolor={grey[100]}
    >
      {/* <Paper height="100%" elevation={10}> */}
      {children}
      {/* </Paper> */}
    </Box>
  )
}

export default Panel
