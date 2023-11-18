import { signal } from '@preact/signals-react'
import './App.css'
import Bar from './components/Bar'
import { Content } from './components/Content';

export const sidebarSignal = signal(false);

function App() {
  return (
    <div >
      <Bar/>
      <Content/>
    </div>
  )
}

export default App
