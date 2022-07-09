import React from 'react'
import { createRoot } from 'react-dom/client'

import 'normalize.css'
import './main.sass'

import App from './App/App'

const root = createRoot(document.getElementById('root'))

root.render(
  <div id='main'>
    <App/>
  </div>
)