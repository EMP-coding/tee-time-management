import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';

import './staff.css';

const StaffLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');  // Changed from password to pin
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(endpoints.STAFF_SIGN_IN, {
                email: email,
                pin: pin  // Changed to send pin
            });
            if (response.status === 200 && response.data.access_token && response.data.staff_id) {
                console.log('Login successful', response.data);
                // Store the access token and staff ID in localStorage
                localStorage.setItem('staffToken', response.data.access_token);
                localStorage.setItem('staffId', response.data.staff_id.toString());
                // Navigate to the Staff Dashboard after successful login
                navigate('/staff-dashboard');
            } else {
                throw new Error('Failed to log in, missing token or staff ID.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError('Error logging in. Please check your credentials.');
        }
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-heading">Staff Login</h2>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" className="form-input" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="pin" className="form-label">PIN:</label>  {/* Changed from Password to PIN */}
                    <input type="password" id="pin" className="form-input" value={pin} onChange={e => setPin(e.target.value)} />
                </div>
                <button type="submit" className="submit-btn">Login</button>
                {loginError && <p className="error-message">{loginError}</p>}
            </form>
        </div>
    );
};

export default StaffLogin;
