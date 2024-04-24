import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Updated interface with full typing based on the backend model
interface Booking {
    id: number;
    tee_time_id: number;
    member_id: number;
    booked_at: string;
    status: string;
}

const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        // Fetch bookings from the API
        axios.get<Booking[]>('/api/bookings')
            .then(response => {
                setBookings(response.data); // Set data with proper typing
            })
            .catch(error => {
                console.error('Error fetching bookings', error);
                // Optional: Set an error state and display error messages
            });
    }, []);

    return (
        <div>
            {bookings.map(booking => (
                <div key={booking.id}>
                    <p>Time: {booking.booked_at}</p>
                    <p>Status: {booking.status}</p>
                </div>
            ))}
        </div>
    );
};

export default Bookings;
