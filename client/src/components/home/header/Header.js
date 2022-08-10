import React, { useEffect, useState } from 'react'
import "./Header.css";
import { BiCart, BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import headerData from '../../data/Header.json'
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../redux/actions/auth/authAction'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Header = () =>
{
    const [showNav, setShowNav] = useState(false)

    const cartItems = useSelector(state => state.cart.cartItems)

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
                    <Link to='/'>
                        <p>{headerData.Brand.Title}</p>
                    </Link>
                </div>
                <div className="headerNav">
                    {headerData.Navbar.map((navLinks) => (
                        <Link
                            key={navLinks.id}
                            to={`${navLinks.link}`}
                        >
                            <p>{navLinks.title}</p>
                        </Link>
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

                    <Link className='cartLength' to={"/mantra-shoping-cart"}>
                        <BiCart size={20} className="headerIcon shopingCart" />
                        {cartItems.length !== 0 && <p>{cartItems.length}</p>}
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
            {/* Mobile Section View */}
            <section className='header-mobile'>
                <Link to='/'>
                    <p>{headerData.Brand.Title}</p>
                </Link>

                {!showNav ?
                    <GiHamburgerMenu
                        size={20}
                        onClick={() => setShowNav(val => !val)} />
                    :
                    <AiOutlineCloseCircle
                        size={20}
                        onClick={() => setShowNav(val => !val)}
                    />
                }
            </section>

            {
                showNav &&
                <section className='header-mobile-nav'>
                    <span>
                        {headerData.Navbar.map((navLinks) => (
                            <Link
                                key={navLinks.id}
                                to={`${navLinks.link}`}
                            >
                                <p>{navLinks.title}</p>
                            </Link>
                        ))}
                    </span>

                    <span>
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

                        <Link className='cartLength' to={"/mantra-shoping-cart"}>
                            <BiCart size={20} className="headerIcon shopingCart" />
                            {cartItems.length !== 0 && <p>{cartItems.length}</p>}
                        </Link>

                    </span>
                </section>
            }
        </React.Fragment>
    )
}

export default Header