import {Navigate , BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import NavbarComp from "./components/Navbar";
import Login from './pages/Login';
import RegisterComp from './pages/Register/Register';
import SellerDashboard from './components/SellerDashboard';

function App() {
  return (
    <Router>
        <NavbarComp/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterComp />} />
          <Route path="/sellerDashboard" element={<SellerDashboard/>} />
          {/* <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
    </Router>    
  )
}

export default App;
