import React from 'react'
import { render } from 'react-dom'
import App from './App.jsx'

document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
render(<App />, document.getElementById('app'))
