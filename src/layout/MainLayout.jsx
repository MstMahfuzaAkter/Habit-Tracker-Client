import React from 'react';
import NavBar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <NavBar />
            <div className="mt-4">
                <Outlet />
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;