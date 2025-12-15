import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/login/Login.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import Tasks from './pages/tasks/Tasks.jsx'
import TaskDetails from './pages/tasks/TaskDetails.jsx'
import Reports from './pages/reports/Reports.jsx'
import ReportDetails from './pages/reports/ReportDetails.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider, Routes } from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<App />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="tasks/:id" element={<TaskDetails />} />
        <Route path="reports" element={<Reports />} />
        <Route path="reports/:id" element={<ReportDetails />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> <RouterProvider router={router} /></AuthProvider>

  </StrictMode>,
)
