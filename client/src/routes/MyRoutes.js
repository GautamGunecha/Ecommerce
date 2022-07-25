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
import Shop from '../components/products/shop/Shop'
import Men from '../components/products/men/Men'
import Women from '../components/products/women/Women'

const MyRoutes = () =>
{
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/mantra-shoping-cart" element={<Cart />} />

                {/* Store Routes */}
                <Route exact path="/shop" element={<Shop />} />
                <Route exact path="/men" element={<Men />} />
                <Route exact path="/women" element={<Women />} />

                {/* App Auth */}
                <Route exact path="/sign-in" element={<SignIn />} />
                <Route exact path="/register" element={<Registration />} />
                <Route exact path="/mantra-user-forgot-password" element={<Forgot />} />
                <Route exact path="/reset/:token" element={<Reset />} />

                {/* User Section */}
                {userInfo && <Route exact path="/profile" element={<Profile />} />}

                {/* Services */}
                <Route exact path="/unsubscribe/newsletter" element={<Unsubscribe />} />

            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes