import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import StaffLogin from './features/staff/StaffLogin';
import MemberLogin from './features/members/MemberLogin';
import MemberDashboard from './features/members/MemberDashboard'; 
import Register from './features/members/MemberRegister';
import TeeTimeScheduler from './features/members/TeeTimeScheduler'; 
import Footer from './components/Footer';
import StaffDashboard from './features/staff/StaffDashBoard';
import GenerateTeeTimes from './features/staff/GenerateTeeTimes';
import ProfileView from './features/members/ProfileView';
import { UserProvider } from './context/UserContext';
import StaffClubNews from './features/staff/StaffClubNews';
const App: React.FC = () => {
    return (
        <Router>
            <UserProvider>
                <Navbar /> 
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/staff/login" element={<StaffLogin />} />
                    <Route path="/members/login" element={<MemberLogin />} />
                    <Route path="/members/register" element={<Register />} />
                    <Route path="/member-dashboard" element={<MemberDashboard />} />
                    <Route path="/schedule-tee-time" element={<TeeTimeScheduler />} />
                    <Route path="/staff-dashboard" element={<StaffDashboard />} />
                    <Route path="/staff/generate-tee-times" element={<GenerateTeeTimes />} />
                    <Route path="/dashboard/profile" element={<ProfileView />} />
                    <Route path="/club-news" element={<StaffClubNews/>} />
                    {}
                </Routes>
                <Footer />
            </UserProvider>
        </Router>
    );
};
export default App;
