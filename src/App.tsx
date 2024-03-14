import './App.css'
import { Hello } from './components/hello/Hello'
import { ConnectedIntakeComponent } from './components/intake/ConnectedIntakeComponent'

function App() {
  return (
    <>
      <h1>SeaHeat placeholder</h1>
      <div className="card">
        <Hello label="hello" />
        <ConnectedIntakeComponent />
      </div>
    </>
  )
}

export default App