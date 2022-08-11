import React, { useEffect, useState } from 'react'
import "./SignIn.css";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../home/footer/Footer';
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from '../../../redux/actions/auth/authAction';
import signInData from "../../data/auth/signIn.json";
import ErrorMessage from '../../error/ErrorMessage';

const SignIn = () =>
{
    document.title = "Mantra. | Sign-In";
    const [showPassword, setShowPassword] = useState("password");

    const alertUser = () =>
    {
        alert("Google Activation De-activated!");
    };

    // Auth
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);

    const { userInfo, error } = userLogin;
    const navigate = useNavigate();

    useEffect(() =>
    {
        if (userInfo)
        {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = (e) =>
    {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div className="signIn">
            <div className="signInHeader">
                <div className="signInHeaderLogo">
                    <Link to="/">
                        <p>{signInData.header[0].branding.title}</p>
                    </Link>
                </div>
                <div className="signInAuth">
                    <p>New to Mantra?</p>
                    <Link to="/register">
                        <button>{signInData.header[0].button.title}</button>
                    </Link>
                </div>
            </div>

            <form onSubmit={submitHandler} className="signInForm" action="">
                <div className="signInFormHeader">
                    <p>Sign - In</p>
                </div>
                <div className="signInFormGoogle">
                    <button onClick={() => alertUser()}>Sign in with Google</button>
                </div>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <div className="signInEmail">
                    <p>Email</p>
                    <input
                        value={email}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="signInPassword">
                    <div className="signInPasswordShowPassword">
                        <p>Password</p>
                        {showPassword === "password" && (
                            <AiOutlineEye
                                className="signInPasswordShowPasswordIcon"
                                onClick={() => setShowPassword("text")}
                            />
                        )}

                        {showPassword === "text" && (
                            <AiOutlineEyeInvisible
                                className="signInPasswordShowPasswordIcon"
                                onClick={() => setShowPassword("password")}
                            />
                        )}
                    </div>
                    <div className="signInPasswordHideShow">
                        <input
                            type={showPassword}
                            name="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="signInForgotPassword">
                    <Link to="/mantra-user-forgot-password">
                        <p>Forgot Password</p>
                    </Link>
                </div>
                <button className="signInSubmitButton" type="submit">
                    Submit
                </button>
                <div className="signInTermsCondition">
                    <p style={{ fontWeight: "500" }}>Terms & Condition:</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sequi
                        aut odit est, sapiente consequuntur tenetur atque! Nam aut
                        voluptatum, nihil praesentium vero illum earum, molestias totam
                        veritatis at ipsum?
                    </p>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default SignIn