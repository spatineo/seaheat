import './App.css'
import { Hello } from './components/hello/Hello';
import { GraphView } from './components/GraphView/GraphView';
import { TemperatureComponent } from './components/TemperatureComponent/TemperatureComponent';
import { ComponentInfo } from './components/ComponentInfo/ComponentInfo';
import Ecahrts from './components/Echarts/EchartsComponent';
import { data } from './data';

function App() {
 
  return (
    <>
      <h1>SeaHeat placeholder</h1>
      <div className="card">
        <Hello label="hello" />
        <GraphView>
          <ComponentInfo position={data.position} depth={- 25} name="Salmisaari - intake 1" meters="m"/>
          <Ecahrts option={data.option} height={300} />
          <TemperatureComponent tempatureValues={data.arg} />
        </GraphView>
      </div>
    </>
  )
}

export default App
