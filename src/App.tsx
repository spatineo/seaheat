import './App.css'
import { ConnectedIntakeComponent } from './app/connected/ConnectedIntakeComponent'
import { ConnectedHello } from './app/connected/ConnectedHello'

function App() {
  return (
    <>
      <h1>SeaHeat placeholder</h1>
      <div className="card">
        <ConnectedHello />
        <ConnectedIntakeComponent />
      </div>
    </>
  )
}

export default App