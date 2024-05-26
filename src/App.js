import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from "./Authentication/Login"
import Register from "./Authentication/Register"
import { PrivateRoute } from './component/protect/productedroute';
import BuyerDashboard from './component/BuyerDashoard/BuyerDasboard';
import SellerDashboard from './component/SellerDashboard/SellerDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SellerProfile from './component/SellerDashboard/SellerProfile';
import EditProperty from './component/SellerDashboard/EditProperty';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route element={<PrivateRoute allowedRoles={['buyer']} />}>
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={['seller']} />}>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
        </Route>
        <Route path="/seller/profile" element={<SellerProfile />}/>
        <Route path="/seller-property/:id" component={<EditProperty />} />
      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
