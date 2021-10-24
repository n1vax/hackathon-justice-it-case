import classNames from "classnames";
import { ReactNode, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Box } from "@mui/material";

interface SidebarProps {
  children: ReactNode;
  show?: boolean;
  className?: string;
}

const Sidebar = ({ children, show, className }: SidebarProps) => {
  const elRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      timeout={600}
      nodeRef={elRef}
      in={show}>
      <Box
        component="div"
        className={classNames("sidebar", className)}
        ref={elRef}
        sx={{
          zIndex: 1,
          position: "relative",
          padding: 3,
          gap: 3,
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}>
        {children}
      </Box>
    </CSSTransition>
  )
}

export default Sidebar
