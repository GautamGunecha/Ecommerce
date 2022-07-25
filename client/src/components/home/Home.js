import React from 'react'
import Header from './header/Header'
import { useLocation } from 'react-router'
import Hero from './hero/Hero';

const HomePage = () =>
{
    return (
        <React.Fragment>
            <Header />
            <Hero />
        </React.Fragment>
    );
};

const Home = () =>
{
    const location = useLocation();

    const Page = () =>
    {
        if (location.pathname === "/") return <HomePage />;
    };
    return (
        <React.Fragment>
            <Page />
        </React.Fragment>
    );
};

export default Home