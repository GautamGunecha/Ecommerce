import React, { useState } from 'react'
import "./Forgot.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from '../../../redux/utils/url'
import forgotData from '../../data/auth/forgot.json'
import Footer from '../../home/footer/Footer'

const Forgot = () =>
{
    document.title = "Mantra | Forgot Password";

    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const resetPassword = async () =>
    {
        if (!email) setErr("Please enter your email");
        await axios
            .post(`${url}/user/forgotpassword`, { email }, config)
            .then((res) =>
            {
                setMsg(res.data);
            })
            .catch((error) =>
            {
                console.log(error);
            });
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        resetPassword();
        setTimeout(() =>
        {
            navigate("/");
        }, 2000);
    };

    return (
        <>
            <div className="forgot">
                <div className="forgotPasswordHeader">
                    <Link to="/">
                        <p>{forgotData.branding.title}</p>
                    </Link>
                </div>
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordContainerHeader">
                        <p>{forgotData.header.title}</p>
                    </div>
                    <div className="forgotPasswordContainerContent">
                        <p>{forgotData.description.title}</p>
                    </div>
                    {msg && <p style={{ marginTop: "2%", color: "green" }}>{msg.msg}</p>}
                    <p style={{ marginTop: "2%", color: "red" }}>{err}</p>
                    <form onSubmit={handleSubmit} className="forgotPasswordContainerForm">
                        <p>{forgotData.reqData.title}</p>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit">{forgotData.button.title}</button>
                    </form>
                    <Link to="/sign-in">
                        <p className="forgotPasswordContainerSignInPage">
                            {forgotData.pageRouting.title}
                        </p>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Forgot