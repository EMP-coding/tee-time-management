import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import axios from 'axios';
import { endpoints } from '../API/apiendpoints';
import MemberDashboard from '../features/members/MemberDashboard';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Updated hook

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(endpoints.LOGIN_MEMBER, {
                email: email,
                password: password
            });
            if (response.status === 200) {
                console.log('Login successful');
                setIsLoggedIn(true);
                // Redirect to Member Dashboard after successful login
                navigate('/member-dashboard'); // Updated method
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError('Error logging in. Please check your credentials.');
        }
    }

    return (
        <div>
            {isLoggedIn ? (
                <MemberDashboard />
            ) : (
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
            )}
        </div>
    );
};

export default LoginForm;
