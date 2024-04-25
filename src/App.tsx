import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ensure the path is correct
import HomePage from './components/HomePage'; // Ensure the path is correct
import StaffLogin from './features/staff/StaffLogin'; // Ensure the path is correct
import MemberLogin from './features/members/MemberLogin'; // Ensure the path is correct
import MemberDashboard from './features/members/MemberDashboard'; // Ensure the path is correct
import Register from './features/members/MemberRegister'; // Ensure the path is correct
import TeeTimeScheduler from './features/members/TeeTimeScheduler'; // Ensure the path is correct
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar /> 
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login/staff" element={<StaffLogin />} />
                <Route path="/members/login" element={<MemberLogin />} />
                <Route path="/members/register" element={<Register />} />
                <Route path="/member-dashboard" element={<MemberDashboard />} />
                <Route path="/schedule-tee-time" element={<TeeTimeScheduler />} />
                {/* Add more routes here if necessary */}
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
