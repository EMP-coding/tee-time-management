import React, { useEffect, useState } from 'react';
import axios from 'axios';


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

        axios.get<Booking[]>('/api/bookings')
            .then(response => {
                setBookings(response.data); 
            })
            .catch(error => {
                console.error('Error fetching bookings', error);
                
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
