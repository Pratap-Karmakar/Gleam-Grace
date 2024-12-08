import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import NoPage from './pages/noPage/NoPage';
import ProductInfo from './components/ProductInfo/ProductInfo';
import ScrollTop from './components/ScrollTop/ScrollTop';
import CartPage from './components/Cart/CartPage';
import Signup from './pages/Registration/Signup';
import Login from './pages/Registration/Login';
import UserDashboard from './pages/User/UserDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AddProductPage from './pages/Admin/AddProductPage';
import UpdateProductPage from './pages/Admin/UpdateProductPage';
import MyState from './Context/MyState';
import { Toaster } from 'react-hot-toast';
import { ProtectedRouteForUser } from './ProtectedRoute/ProtectedRouteForUser';
import { ProtectedRouteForAdmin } from './ProtectedRoute/ProtectedRouteForAdmin';
import AllProduct from './pages/AllProduct/AllProduct';
import CategoryPage from './pages/Category/CategoryPage';
import CustomJewelryOrder from './components/CustomJewelryOrder/CustomJewelryOrder';

function App() {
  return (
   <MyState>
    <BrowserRouter>   
   <ScrollTop/> 
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/*' element={<NoPage/>}></Route>
        <Route path="/productinfo/:id" element={<ProductInfo />}></Route>
        <Route path='/cart' element={<CartPage/>}></Route>
        <Route path='/allproduct' element={<AllProduct/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/user-dashboard' element={
          <ProtectedRouteForUser>
            <UserDashboard/>
          </ProtectedRouteForUser>
        }></Route>
        <Route path='/admin-dashboard' element={
          <ProtectedRouteForAdmin>
            <AdminDashboard/>
          </ProtectedRouteForAdmin>
        }></Route>
        <Route path="/addproduct" element={
          <ProtectedRouteForAdmin>
            <AddProductPage/>
          </ProtectedRouteForAdmin>
        }></Route>
        <Route path="/updateproduct/:id" element={
          <ProtectedRouteForAdmin>
            <UpdateProductPage/>
          </ProtectedRouteForAdmin>
        }></Route>
        <Route path="/category/:categoryname" element={<CategoryPage />} />
        <Route path="/customjewelryorder" element={<CustomJewelryOrder />} />
      </Routes>
        <Toaster/>
   </BrowserRouter>
   </MyState>
  );
}

export default App;
