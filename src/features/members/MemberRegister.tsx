import React, { useState } from 'react';
import { endpoints } from '../../API/apiendpoints';
import axios from 'axios';

const Register: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('')
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            console.error("Passwords do not match");
            return;
        }
        
        try {
            const response = await axios.post(endpoints.REGISTER_MEMBER, {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
            });
            
            if (response.status === 201) {
                console.log('Registration successful');
                alert('Registration successful'); // Display popup message
                window.location.href = "/"; // Redirect to home page
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering member:', error);
        }
    };

    return (
        <div className="register-container">
          <h2 className="register-heading">Register</h2>
          {error && <div className="error-message">{error}</div>}
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name:</label>
              <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name:</label>
              <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="email" id="email" value={email} onChange={handleEmailChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password:</label>
              <input type="password" id="password" value={password} onChange={handlePasswordChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} className="form-input" required />
            </div>
            <button type="submit" className="submit-btn">Register</button>
          </form>
          <p className="login-link">Already have an account? <a href="/members/login">Login</a></p>
        </div>
      );
};

export default Register;
