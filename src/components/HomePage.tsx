import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Tee Time Management</h1>
            <img src="/src/assets/pngimg.com - golf_PNG31.png"></img>
            <Link to="/staff/login">
                <button style={{ marginRight: '20px', padding: '10px 20px' }}>Staff Login</button>
            </Link>
            <Link to="/members/login">
                <button style={{ marginRight: '20px', padding: '10px 20px' }}>Member Login</button>
            </Link>
            <Link to="/members/register">
                <button style={{ padding: '10px 20px' }}>Not a member yet? Register here</button>
            </Link>
        </div>
    );
};

export default HomePage;
