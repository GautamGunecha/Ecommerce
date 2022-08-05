import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from "react-redux";
import Home from '../components/home/Home'
import SignIn from '../components/auth/login/SignIn';
import Registration from '../components/auth/registration/Registration';
import Reset from '../components/auth/reset/Reset'
import Forgot from '../components/auth/forgot/Forgot';
import Profile from '../components/user/profile/Profile'
import Unsubscribe from '../components/home/newsletter/unsubscribe/Unsubscribe'
import Cart from '../components/cart/Cart';
import ProductPage from '../components/products/items/ProductPage';
import Male from '../components/products/category/male/Male';
import Female from '../components/products/category/female/Female';
import Success from '../components/success/Success';
import Admin from '../admin/Admin';

const MyRoutes = () =>
{
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/mantra-shoping-cart" element={<Cart />} />

                {/* App Auth */}
                <Route exact path="/sign-in" element={<SignIn />} />
                <Route exact path="/register" element={<Registration />} />
                <Route exact path="/mantra-user-forgot-password" element={<Forgot />} />
                <Route exact path="/reset/:token" element={<Reset />} />

                {/* User Section */}
                {userInfo && <Route exact path="/profile" element={<Profile />} />}

                {/* Services */}
                <Route exact path="/unsubscribe/newsletter" element={<Unsubscribe />} />

                {/* Specific Product Page */}
                <Route path='/product/page/:productID' element={<ProductPage />} />

                {/* product category */}
                <Route exact path="/men" element={<Male />} />
                <Route exact path="/women" element={<Female />} />

                {/* payment success */}
                <Route exact path="/success" element={<Success />} />

                {/* Admin access */}
                {userInfo.isAdmin ? <Route exact path='/admin' element={<Admin />} /> : <Route exact path='/' element={<Home />} />}

            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes