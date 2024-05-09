import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 
import './navbar.css';

const Navbar: React.FC = () => {
    const { isLoggedIn, setIsLoggedIn } = useUser();

    useEffect(() => {
        // This effect will ensure the Navbar re-renders when the isLoggedIn status changes.
        // It's crucial if isLoggedIn is toggled from anywhere outside this component.
    }, [isLoggedIn]);

    const handleSignOut = () => {
        // Simulate the sign-out logic here
        setIsLoggedIn(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('memberId');
        localStorage.removeItem('clubId');

        
        window.location.href = '/'; 
    };

    return (
        <nav className="navbar navbackground navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Tee Time Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/member-dashboard">Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard/profile">Profile</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {isLoggedIn && (
                        <button className="btn signout-btn btn-outline-success" type="button" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;