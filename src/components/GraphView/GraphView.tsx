import { ReactNode  } from "react";
import { Box } from "@chakra-ui/react";
import './GrahpView.css';

interface GraphViewProps {
  children:  ReactNode
}

export const GraphView = ({children} : GraphViewProps ) => {
    return (
    <Box className="main">
     <Box className="container">
      {children}
      </Box>
      <Box className="label">
        Selected Intake point
      </Box>
    </Box>)
}
