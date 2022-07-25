import React, { useState } from 'react'
import "./Newsletter.css";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import { url } from '../../../redux/utils/url';

const Newsletter = () =>
{
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const subscribeNewsLetter = async () =>
    {
        await axios
            .post(`${url}/newsletter/subscribe`, { email }, config)
            .then((res) => setMsg(res.data.msg))
            .catch((err) => console.log(err));
    };

    const onSubmit = (e) =>
    {
        e.preventDefault();
        subscribeNewsLetter();
    };
    return (
        <div className="newsLetter">
            <h1>Newsletter</h1>
            {msg ? (
                <p className="subscriptionMsg">{msg}</p>
            ) : (
                <p>Get timely updates on your favourite products.</p>
            )}
            <form onSubmit={onSubmit}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    type="email"
                />
                <button type="submit">
                    <FiSend size={20} />
                </button>
            </form>
        </div>
    )
}

export default Newsletter