import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';
import { useUser } from '../../context/UserContext';
import { storeToken } from '../../auth/authentication';
import './members.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { setIsLoggedIn, setUser, user } = useUser(); // Add setUser and user to access user context
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(endpoints.LOGIN_MEMBER, { email, password });
            if (response.status === 200) {
                console.log('Login successful');
                const { access_token, member_id } = response.data; // Extract member_id from response data
                storeToken(access_token); // Store the token received from login
                setUser({ memberId: member_id }); // Update user context with memberId
                setIsLoggedIn(true);
                navigate('/member-dashboard');

                // Add a console.log statement to log the user context after login
                console.log('User context after login:', user);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError('Error logging in. Please double check your email and password.');
        }
    };

    return (
        <div className="login-container"> {/* Use similar container styling */}
            <h2 className="register-heading">Login</h2> {/* Reuse the heading class for consistency */}
            <form onSubmit={handleSubmit} className="register-form"> {/* Reuse the form class for consistency */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="form-input" required />
                </div>
                <button type="submit" className="submit-btn">Login</button>
                {loginError && <p className="error-message">{loginError}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
