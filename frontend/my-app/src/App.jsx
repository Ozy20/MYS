import { useState } from 'react'
import SideNav from './components/nav/sideNav.jsx'
import { Outlet } from "react-router-dom"
import { useAuth } from './context/AuthContext.jsx'
import './App.css'

function App() {
  const { user } = useAuth();
  return (
    <div id="App" >
      <div id="side-nav">
        <SideNav userRole={user.role} />
      </div>
      <div id="content">
        <Outlet context={{ userRole: user.role }} />
      </div>
    </div>
  )
}

export default App
