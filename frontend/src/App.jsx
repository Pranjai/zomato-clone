import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import BuyerSignup from './components/BuyerSignup'
import VendorSignup from './components/VendorSignup'
import BuyerDashboard from './components/BuyerDashboard'
import VendorDashboard from './components/VendorDashboard'
import { useUser } from './context/UserContext'
import './App.css'

function App() {
  const { user, isLoggedIn } = useUser();
  return (
    <div>
      <Routes>
        <Route path='/' element={isLoggedIn ? user?.userType == "Buyer" ? <BuyerDashboard /> : <VendorDashboard /> : <Login />} />
        <Route path='/buyer-signup' element={<BuyerSignup />} />
        <Route path='/vendor-signup' element={<VendorSignup />} />
      </Routes>
    </div>
  )
}

export default App
