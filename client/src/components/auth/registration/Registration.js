import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";
import Footer from '../../home/footer/Footer';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../../redux/actions/auth/authAction';
import ErrorMessage from '../../error/ErrorMessage';

const Registration = () =>
{
    document.title = "Mantra. | Register | New User";
    const [showPassword, setShowPassword] = useState("password");

    // Auth
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, userInfo } = userRegister;

    useEffect(() =>
    {
        if (userInfo)
        {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        dispatch(register(user));
        setUser({ name: "", email: "", password: "" });
    };
    return (
        <div className="register">
            <div className="registerHeader">
                <div className="registerHeaderLogo">
                    <Link to="/">
                        <p>Mantra.</p>
                    </Link>
                </div>
                <div className="registerAuth">
                    <p>Already on Mantra?</p>
                    <Link to="/sign-in">
                        <button>Sign in</button>
                    </Link>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="registrationForm">
                <div className="registrationFormHeader">
                    <p>Create an Account</p>
                </div>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <div className="registrationFormName">
                    <p>Full Name</p>
                    <input
                        value={user.name}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                </div>
                <div className="registrationFormEmail">
                    <p>Email</p>
                    <input
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="registrationFormPassword">
                    <div className="registrationFormShowPassword">
                        <p>Password</p>

                        {showPassword === "password" && (
                            <AiOutlineEye
                                className="registrationFormShowPasswordIcon"
                                onClick={() => setShowPassword("text")}
                            />
                        )}

                        {showPassword === "text" && (
                            <AiOutlineEyeInvisible
                                className="registrationFormShowPasswordIcon"
                                fontSize="small"
                                onClick={() => setShowPassword("password")}
                            />
                        )}
                    </div>
                    <input
                        type={showPassword}
                        name="password"
                        placeholder="Enter password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>
                <button className="registrationSubmitButton" type="submit">
                    Submit
                </button>
                <div className="registrationCondition">
                    <p style={{ fontWeight: "500" }}>Terms & Condition</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
                        quibusdam, totam officiis hic vero earum aperiam dolor assumenda,
                        adipisci ratione explicabo aut dolore vitae velit eos reiciendis
                        delectus at ad!
                    </p>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default Registration