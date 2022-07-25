import axios from 'axios';
import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi';
import { url } from '../../../../redux/utils/url';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';

const Unsubscribe = () =>
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
            .post(`${url}/newsletter/unsubscribe`, { email }, config)
            .then((res) => setMsg(res.data.msg))
            .catch((err) => console.log(err));
    };

    const onSubmit = (e) =>
    {
        e.preventDefault();
        subscribeNewsLetter();
    };
    return (
        <React.Fragment>
            <Header />
            <div className="newsLetter unsubscribe">
                <h1>Unsubscribe to Newsletter</h1>
                {msg ? (
                    <p className="subscriptionMsg">{msg}</p>
                ) : (
                    <p className="unsubscribePara">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                        veritatis reprehenderit voluptatem ipsam, ducimus libero sed
                        exercitationem esse, vero omnis minus aspernatur et est ex veniam
                        iure repellendus, nemo expedita?
                    </p>
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
            <Footer />
        </React.Fragment>
    )
}

export default Unsubscribe