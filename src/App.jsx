import { Route, Routes } from 'react-router'
import HandleOrder from './components/handle-order/HandleOrder'
import Headers from './components/header/Header'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import OrderList from './components/order-list/OrderList'
// import Register from './components/register/Register'
import { AuthProvider } from './context/AuthContext'
import { ErrorProvider } from './context/ErrorContext'
import Error from './components/error/Error'

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <Headers />
        <div className='container'>
          <Error />
          <Routes>
            {/* <Route path='/' element={<Register/>}/> */}
            <Route path='/' element={<Login />} />
            <Route path='/create' element={<HandleOrder />} />
            <Route path='/:orderId/edit' element={<HandleOrder />} />
            <Route path='/orders' element={<OrderList />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </div>
      </AuthProvider>
    </ErrorProvider>
  )
}

export default App
