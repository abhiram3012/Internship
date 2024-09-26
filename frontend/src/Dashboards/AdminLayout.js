import React from 'react'
import { Outlet} from 'react-router-dom'
import AdminDashboard from '../pages/AdminDashboard'

const AdminLayout = () => {
  return (
    <div className="flex">
        <AdminDashboard />
        <div className="ml-[20rem] p-4 w-full"> {/* Adjusts the margin-left to account for the sidebar width */}
          <Outlet /> {/* Renders the child routes */}
        </div>
      </div>
  )
}

export default AdminLayout