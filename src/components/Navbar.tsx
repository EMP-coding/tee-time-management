import React from 'react';
import { Link } from 'react-router-dom';
import { isUserSignedIn, signOut } from '../auth/authentication'; // Import the signOut function

const Navbar: React.FC = () => {
    // Check if user is signed in
    const signedIn = isUserSignedIn();

    // Event handler for sign out button
    const handleSignOut = () => {
        // Call the signOut function to clear the token from local storage
        signOut();
        // Redirect to the home page or any other desired location
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Tee Time Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbackground collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                    </ul>
                    {signedIn && (
                        <button className="btn btn-outline-success" type="button" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
