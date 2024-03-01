import { Box} from "@chakra-ui/react";
import './App.css'
import { TemperatureComponent } from './components/TemperatureComponent/TemperatureComponent'
import { data } from '../stories/data';

function App() {
 
  return (
    <>
      <h1>SeaHeat placeholder</h1>
      <Box>
      <TemperatureComponent tempatureValues={data.arg} option={data.option} position={data.position} name="Salmisaari - intake 1" height={300} />
      </Box>
    </>
  )
}

export default App
