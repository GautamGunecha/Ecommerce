import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from "react-redux";
import Home from '../components/home/Home'
import SignIn from '../components/auth/login/SignIn';

const MyRoutes = () =>
{
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />

                {/* App Auth */}
                <Route exact path="/sign-in" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes