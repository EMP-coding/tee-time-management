import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashBoardLayout';

const MemberDashboard: React.FC = () => {
    return (
        <DashboardLayout>
            <h2>Welcome, Member!</h2>
            <div>
                <Link to="/my-tee-times">
                    <button style={{ marginRight: '20px', padding: '10px 20px' }}>View My Tee Times</button>
                </Link>
                <Link to="/book-tee-time">
                    <button style={{ marginRight: '20px', padding: '10px 20px' }}>Book a Tee Time</button>
                </Link>
                <Link to="/schedule-tee-time">
                    <button style={{ padding: '10px 20px' }}>Schedule a Tee Time</button>
                </Link>
            </div>
        </DashboardLayout>
    );
};

export default MemberDashboard;