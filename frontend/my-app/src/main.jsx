import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/login/Login.jsx'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider, Routes } from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App />}>
        <Route path="dashboard" element={<div style={{ color: 'black' }}>Dashboard</div>} />
        <Route path="my-tasks" element={<div>My Tasks</div>} />
        <Route path="assign-task" element={<div>Assign Task</div>} />
        <Route path="reports" element={<div>Reports</div>} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
