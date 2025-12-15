import { useState } from 'react'
import SideNav from './components/nav/sideNav.jsx'
import { Outlet } from "react-router-dom"
import './App.css'

function App() {

  return (
    <div id="App" >
      <div id="side-nav">
       <SideNav userRole="manager"/>
      </div>
      <div id="content">
        <Outlet />
      </div>
    </div>
  )
}

export default App
