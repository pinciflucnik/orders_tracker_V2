import { useContext } from 'react'
import { Route, Routes } from 'react-router'
import AddOrder from './components/add-order/AddOrder'
import Headers from './components/header/Header'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import OrderList from './components/order-list/OrderList'
import Register from './components/register/Register'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Headers />
      <Routes>
        {/* <Route path='/' element={<Register/>}/> */}
        <Route path='/' element={<Login/>}/>
        <Route path='/create' element={<AddOrder />} />
        <Route path='/orders' element={<OrderList />}/>
        <Route path='/logout' element={<Logout />}/>
      </Routes>
    </AuthProvider>
  )
}

export default App
