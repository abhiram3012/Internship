import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ComplainForm from './components/ComplainForm';
import HistoryComponents from './components/HistoryComponents';
import EnduserLayout from './Dashboards/EnduserLayout';
import LoginForm from './pages/LoginPage';
import AdminLayout from './Dashboards/AdminLayout';
import TechnicianLayout from './Dashboards/TechnicianLayout';
import NewProblems from './pages/NewProblems';
import ProblemDetails from './pages/ProblemDetails';
import Inbox from './pages/Inbox';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import NewComplaints from './components/NewComplaints';
import Solved from './components/Solved';
import InProgress from './components/InProgress';
import Rejected from './components/Rejected';
import Profile from './components/Profile';
import MyTasks from './components/MyTasks';
import ProtectedRoute from './utils/ProtectedRoute';
import TechnicianProblemDetails from './pages/TechnicianProblemDetails';
import TechnicianHistoryComp from './components/TechnicianHistoryComp';

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path='/' element={<LoginForm />} />
      
      {/* Protected routes for Enduser */}
      <Route path='/enduser' element={<ProtectedRoute allowedRoles={['enduser']}><EnduserLayout /></ProtectedRoute>}>
        <Route path='complain' element={<ComplainForm />} />
        <Route path='history' element={<HistoryComponents />} />
        <Route path='profile' element={<Profile />} />
      </Route>

      {/* Protected routes for Admin */}
      <Route path='/admin' element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
        <Route path='new-complaints' element={<NewComplaints />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='users' element={<Users />} />
        <Route path='problem/:id' element={<ProblemDetails />} />
        <Route path='dashboard/solved' element={<Solved />} />
        <Route path='dashboard/in-progress' element={<InProgress />} />
        <Route path='dashboard/rejected' element={<Rejected />} />
        <Route path='profile' element={<Profile />} />
      </Route>

      {/* Protected routes for Technician */}
      <Route path='/technician' element={<ProtectedRoute allowedRoles={['technician']}><TechnicianLayout /></ProtectedRoute>}>
        <Route path='new-problems' element={<NewProblems />} />
        <Route path='problem/:id' element={<TechnicianProblemDetails />} />
        <Route path='problemdetails/:id' element={<ProblemDetails />} />
        <Route path='inbox' element={<Inbox />} />
        <Route path='history' element={<TechnicianHistoryComp />} />
        <Route path='profile' element={<Profile />} />
        <Route path='my-tasks' element={<MyTasks />} />
      </Route>
    </Routes>
  );
}

export default App;
