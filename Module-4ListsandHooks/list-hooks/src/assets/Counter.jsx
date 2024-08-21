import React, { useState} from 'react'
import reactLogo from './react.svg'

export default function Counter() {
    const [count, setCount] = useState(0)
  return (
    <div>
       <div>
       
       <a href="https://react.dev" target="_blank">
         <img src={reactLogo} className="logo react" alt="React logo" />
       </a>
     </div>
          <h1>Counter APP</h1>
          <h1>{ count}</h1>
     <div className="card">
       <button onClick={() => setCount((count) => count + 1)}>
         Increment 
       </button>
       <button onClick={() => setCount((count) => count - 1)}>
         Decrement 
       </button>
       
     </div>
    </div>
  )
}
