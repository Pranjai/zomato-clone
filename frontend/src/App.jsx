import {Routes, Route, Navigate} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Signup from './components/Signup'
import BuyerDashboard from './components/BuyerDashboard'
import VendorDashboard from './components/VendorDashboard'
import VendorProfile from './components/VendorProfile'
import BuyerProfile from './components/BuyerProfile'
import Navbar from './components/Navbar'
import { useUser } from './context/UserContext'
import './App.css'

function App() {
  const { user, isLoggedIn } = useUser();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path='/' element={isLoggedIn ? user?.userType == "Buyer" ? <BuyerDashboard /> : <VendorDashboard /> : <Login />} />
          <Route path='/signup' element={isLoggedIn ? <Navigate to='/' replace /> : <Signup />} />
          <Route path='/profile' element={<ProtectedRoute>{user?.userType == "Buyer" ? <BuyerProfile /> : <VendorProfile />}</ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
