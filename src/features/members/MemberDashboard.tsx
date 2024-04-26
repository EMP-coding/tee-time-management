import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { endpoints } from '../../API/apiendpoints';
import { useUser } from '../../context/UserContext';
import './members.css'; // Ensure this file includes all the necessary styles

const MemberDashboard: React.FC = () => {
    const { user } = useUser();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user && user.memberId) {
            fetchBookings(user.memberId);
        }
    }, [user]);

    const fetchBookings = async (memberId) => {
        try {
            const response = await axios.get(`${endpoints.GET_BOOKING_BY_ID}/member/${memberId}`);
            setBookings(response.data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        }
    };

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
                    <Link to="/schedule-tee-time" className="dashboard-link">
                        <button className="btn btn-primary">Schedule a Tee Time</button>
                    </Link>
                </div>
                <div className="reservation-window" style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                    <h3>Current Reservations</h3>
                    <div className="reservation-details">
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <div key={booking.id} className="reservation-entry">
                                    <div className="tee-time-details">
                                        <p>Reservation at: {booking.course_name}</p>
                                        <p>Tee Time: {new Date(booking.tee_time_start).toLocaleString()}</p>
                                        <p>Status: {booking.status}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            'You don\'t have any reservations currently'
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MemberDashboard;
