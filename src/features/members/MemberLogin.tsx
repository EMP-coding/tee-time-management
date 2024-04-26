import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(endpoints.LOGIN_MEMBER, {
                email: email,
                password: password
            });
            if (response.status === 200 && response.data.access_token && response.data.member_id) {
                console.log('Login successful', response.data);
                // Store the access token and member ID in localStorage
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('memberId', response.data.member_id.toString());
                // Navigate to the Member Dashboard after successful login
                navigate('/member-dashboard');
            } else {
                throw new Error('Failed to log in, missing token or member ID.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError('Error logging in. Please check your credentials.');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
                {loginError && <p>{loginError}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
