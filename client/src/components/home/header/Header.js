import React, { useEffect } from 'react'
import "./Header.css";
import { BiCart, BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import headerData from '../../data/Header.json'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../redux/actions/auth/authAction'

const Header = () =>
{
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigation = useNavigate();

    const logoutHandler = () =>
    {
        dispatch(logout());
        navigation("/");
    };

    useEffect(() => { }, [userInfo]);

    return (
        <React.Fragment>
            <div className="header">
                <div className="headerLogo">
                    <a href={`http://localhost:3000`}>
                        <p>{headerData.Brand.Title}</p>
                    </a>
                </div>
                <div className="headerNav">
                    {headerData.Navbar.map((navLinks) => (
                        <a
                            key={navLinks.id}
                            href={`http://localhost:3000/${navLinks.link}`}
                        >
                            <p>{navLinks.title}</p>
                        </a>
                    ))}
                </div>
                <div className="headerIcons">
                    {userInfo && (
                        <Link to={"/profile"}>
                            <img
                                src={userInfo.avatar}
                                alt={userInfo.name}
                                className="headerIcon"
                            />
                        </Link>
                    )}



                    {!userInfo && (
                        <Link to={"/sign-in"}>
                            <BiUser size={20} className="headerIcon" />
                        </Link>
                    )}

                    <Link to={"/mantra-shoping-cart"}>
                        <BiCart size={20} className="headerIcon shopingCart" />
                    </Link>
                    {userInfo && (
                        <div>
                            <FiLogOut
                                onClick={logoutHandler}
                                size={20}
                                className="headerIcon"
                            />
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header