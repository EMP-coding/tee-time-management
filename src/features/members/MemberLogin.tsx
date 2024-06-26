import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';
import { useUser } from '../../context/UserContext';
import './members.css';

const MemberLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { setLoginState } = useUser(); 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(endpoints.LOGIN_MEMBER, {
                email: email,
                password: password
            });
            if (response.status === 200 && response.data.access_token && response.data.member_id) {
                console.log('Login successful', response.data);

                // Update context with user information
                setLoginState({
                    accessToken: response.data.access_token,
                    staffId: response.data.member_id,
                    clubId: response.data.club_id,
                    isStaff: false
                });

                // Store the access token and member ID in localStorage
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('memberId', response.data.member_id.toString());
                localStorage.setItem('clubID', response.data.club_id.toString());
                localStorage.setItem('firstName', response.data.first_name.toString());

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
        <div className='portaltitle'>
            <h3>Member Portal</h3>
            <div className="member-login-container">
                <form onSubmit={handleSubmit} className="member-login-form">
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
        </div>
    );
};

export default MemberLogin;
