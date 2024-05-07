import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';
import './staff.css';

interface Booking {
    booking_id: number;
    member_id: number;
    status: string;
    booked_at: string;
}
interface TeeTime {
    id: number;
    start_time: string;
    slots: Array<{
        member_id?: number;
        status?: string;
        booked_at?: string;
    }>;
    bookings: Booking[];
}

interface Course {
    id: number;
    course_name: string;
}


const StaffDashboard: React.FC = () => {
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);

    useEffect(() => {
        fetchTeeTimes(date); // Fetch tee times based on the selected date
    }, [date]); 

    const fetchTeeTimes = async (selectedDate: string) => {
        try {
            const response = await axios.get<TeeTime[]>(`${endpoints.GET_BOOKINGS_WITH_TEE_TIMES}?date=${selectedDate}`);
            const processedTeeTimes = response.data.map(teeTime => ({
                ...teeTime,
                slots: [...Array(4)].map((_, index) => teeTime.bookings[index] || { member_id: null, status: 'AVAILABLE' })
            }));
            setTeeTimes(processedTeeTimes);
        } catch (error) {
            console.error('Failed to fetch tee times', error);
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value); 
    };
    const navigate = useNavigate(); 
    const goToGenerateTeeTimes = () => {
        navigate('/staff/generate-tee-times');
    };
    return (
        <div className="staff-dashboard">
            <h1>Staff Dashboard</h1>
            <div>
                <h2>Tee Sheet Viewer</h2>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                />
                <div className="tee-time-list2">
    {teeTimes.map((teeTime, index) => (
        <div key={index} className="tee-time-item2">
            <h4>{new Date(teeTime.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
            {teeTime.slots.map((slot, slotIndex) => (
    <div key={slotIndex} className={`tee-time-slot ${slot.status === 'BOOKED' ? 'booked' : 'available'}`}>
        {slot.status === 'BOOKED' ?
            `Member ID: ${slot.member_id}, Status: ${slot.status}, Booked At: ${
                slot.booked_at ? new Date(slot.booked_at).toLocaleString() : 'N/A'
            }`
            :
            "Available"
        }
    </div>
))}
        </div>
    ))}
</div>
            </div>
            {/* Other contents */}
            <button onClick={goToGenerateTeeTimes} className="btn-generate-tee-times">
                Generate Tee Times
            </button>
        </div>
    );
};

export default StaffDashboard;