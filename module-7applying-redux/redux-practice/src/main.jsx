import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import { storeData } from './store.js';


createRoot(document.getElementById('root')).render(
  
  <Provider store={storeData}>
    <App />
    </Provider>
  ,
)
