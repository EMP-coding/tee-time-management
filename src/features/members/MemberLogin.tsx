import React, { useState } from 'react';
import axios from 'axios';
import { endpoints } from '../../../API/apiendpoints';


const MemberLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(endpoints.LOGIN_MEMBER, {
                email,
                password
            });
            if (response.status === 200) {
                console.log('Login successful');
                // Redirect or perform other actions upon successful login
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="member-login-container">
            <h2 className="login-heading">Member Login</h2>
            <form className="member-login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} className="form-input" required />
                </div>
                <button type="submit" className="submit-btn">Login</button>
            </form>
            <p className="register-link">Don't have an account? <a href="/register" className="register-link">Register</a></p>
        </div>
    );
};

export default MemberLogin;