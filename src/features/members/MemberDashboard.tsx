import React from 'react';
import { Link } from 'react-router-dom';
import './members.css'; // Make sure this file contains all your styles

const MemberDashboard: React.FC = () => {
    return (
        <div>
            {/* Dashboard Header */}
            <header className="dashboard-header">
                <h1>My Dashboard</h1>
                <nav className="dashboard-nav">
                    <ul className="dashboard-links">
                        <li><Link to="/dashboard">Home</Link></li>
                        <li><Link to="/dashboard/profile">Profile</Link></li>
                        <li><Link to="/dashboard/settings">Settings</Link></li>
                        <li><Link to="/dashboard/logout">Logout</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Main Dashboard Content */}
            <main className="member-dashboard">
                <h2>Welcome, Member!</h2>
                <div className="dashboard-buttons">
                    <Link to="/my-tee-times" className="dashboard-link">
                        <button className="btn btn-primary">Edit My Tee Times</button>
                    </Link>
                    <Link to="/schedule-tee-time" className="dashboard-link">
                        <button className="btn btn-primary">Schedule a Tee Time</button>
                    </Link>
                </div>
                <div className="reservation-window">
                    <h3>Current Reservations</h3>
                    {/* Placeholder for reservation details */}
                    <div className="reservation-details">
                        You don't have any reservations currently
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MemberDashboard;
