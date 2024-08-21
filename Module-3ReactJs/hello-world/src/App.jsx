import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{border:"8px solid gray"}}>
      <div style={{backgroundColor:"black",color:'skyblue'}}>
        <a href="https://react.dev" target="_blank" >
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1 style={{margin:"0"}}>React</h1>
      </div>
      <div className="card" style={{background:"blue",color:"white"}}>
      <h1>Hello World</h1>
       
      </div>
      
    </div>
  )
}

export default App
