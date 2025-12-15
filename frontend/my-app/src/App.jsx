import { useState } from 'react'
import SideNav from './components/nav/sideNav.jsx'
import { Outlet } from "react-router-dom"
import './App.css'

function App() {
  const [userRole, setUserRole] = useState('manager');

  return (
    <div id="App" >
      <div id="side-nav">
        <SideNav userRole={userRole} />
      </div>
      <div id="content">
        <Outlet context={{ userRole, setUserRole }} />
      </div>
    </div>
  )
}

export default App
