import { Box } from "@chakra-ui/react";
import { TemperatureComponent } from '../TemperatureComponent/TemperatureComponent';
import { ComponentInfo } from '../ComponentInfo/ComponentInfo';
import Ecahrts from '../Echarts/EchartsComponent';
import { data } from '../../../stories/data';
import './GrahpView.css';

export const GraphView = () => {
    return (
    <Box className="graph">
     <Box className="graph-container">
     <ComponentInfo position={data.position} name="Salmisaari - intake 1" meters="m"/>
          <Ecahrts option={data.option} height={300} />
          <TemperatureComponent tempatureValues={data.arg} />
      </Box>
      <Box className="graph-label">
        Selected Intake point
      </Box>
    </Box>)
}
