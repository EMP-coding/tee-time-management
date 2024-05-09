import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { endpoints } from '../../API/apiendpoints';
import { useUser } from '../../context/UserContext';
import './members.css';

const MemberDashboard = () => {
    const { user } = useUser();
    const [groupedBookings, setGroupedBookings] = useState({});

    useEffect(() => {
        if (user && user.memberId) {
            fetchBookings(user.memberId);
        }
    }, [user]);

    const fetchBookings = async (memberId: number) => {
        try {
            const response = await axios.get(`${endpoints.GET_BOOKING_BY_ID}/bookings/member/${memberId}`);
            groupBookings(response.data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        }
    };

    const groupBookings = (bookings) => {
        const grouped = bookings.reduce((acc, booking) => {
            const key = booking.tee_time_start; 
            if (!acc[key]) {
                acc[key] = {
                    ...booking,
                    slotsBooked: 1,
                    teeTimeId: booking.tee_time_id 
                };
            } else {
                acc[key].slotsBooked += 1;
            }
            return acc;
        }, {});
        setGroupedBookings(grouped);
    };

    const handleDelete = async (teeTimeId) => {
        if (window.confirm("Are you sure you want to delete all your bookings for this tee time?")) {
            try {
                const deleteUrl = endpoints.DELETE_TEE_TIME
                    .replace('{tee_time_id}', teeTimeId)
                    .replace('{member_id}', user.memberId);

                const response = await axios.delete(deleteUrl);
                if (response.status === 200) {
                    fetchBookings(user.memberId);  // Refresh the bookings list
                    alert('Bookings deleted successfully');
                }
            } catch (error) {
                console.error('Failed to delete the bookings:', error);
                alert('Failed to delete the bookings');
            }
        }
    };

    return (
        <div>
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
                        {Object.keys(groupedBookings).length > 0 ? (
                            Object.values(groupedBookings).map((booking) => (
                                <div key={booking.tee_time_start} className="reservation-entry">
                                    <div className="tee-time-details">
                                        <p>Reservation at: {booking.course_name}</p>
                                        <p>Tee Time: {new Date(booking.tee_time_start).toLocaleString()}</p>
                                        <p>Status: {booking.status}</p>
                                        <p>{booking.slotsBooked} slots booked</p>
                                    </div>
                                    <button onClick={() => handleDelete(booking.teeTimeId)} className="delete-tee-time-btn">Delete</button>
                                </div>
                            ))
                        ) : (
                            'You don\'t have any reservations currently.'
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MemberDashboard;