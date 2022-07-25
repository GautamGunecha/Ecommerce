import React, { useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Reset.css";
import { url } from '../../../redux/utils/url'

const Reset = () =>
{
    const [password, setPassword] = useState("");
    const { token } = useParams();
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `${token}`,
        },
    };

    const resetPassword = async () =>
    {
        if (!password) setErr("Please new password");
        await axios
            .post(`${url}/user/resetpassword`, { password }, config)
            .then((res) =>
            {
                setMsg(res.data);
            })
            .catch((error) =>
            {
                console.log(error);
            });
    };

    const onSubmit = (e) =>
    {
        e.preventDefault();
        resetPassword();
        setTimeout(() =>
        {
            navigate("/sign-in");
        }, 2000);
    };

    return (
        <div className="resetPassword">
            <Link to="/">
                <h1>Mantra.</h1>
            </Link>
            <form onSubmit={onSubmit} className="resetPasswordForm">
                {msg && <p style={{ marginTop: "2%", color: "green" }}>{msg.msg}</p>}
                <p style={{ marginTop: "2%", color: "red" }}>{err}</p>
                <p>Reset Password</p>
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
                <div className="resetTerms">
                    <p style={{ fontWeight: "600" }}>Terms & Condition</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
            </form>
        </div>
    )
}

export default Reset