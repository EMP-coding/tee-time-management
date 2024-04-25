import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import HomePage from './components/HomePage';
import StaffLogin from './features/staff/StaffLogin';
import MemberLogin from './features/members/MemberLogin';
import MemberDashboard from './features/members/MemberDashboard';
import Register from './features/members/MemberRegister';
import TeeTimeScheduler from './features/members/TeeTimeScheduler';

const App: React.FC = () => {
    return (
        <Router>
            {/* Include Navbar component */}
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login/staff" element={<StaffLogin />} />
                <Route path="/login/member" element={<MemberLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/member-dashboard" element={<MemberDashboard />} />
                <Route path="/schedule-tee-time" element={<TeeTimeScheduler />} />
                {/* Additional routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
