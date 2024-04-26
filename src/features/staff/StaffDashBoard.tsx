import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import './staff.css';

interface TeeTime {
    id: number;
    start_time: string;
    booked: boolean;
}

const StaffDashboard: React.FC = () => {
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);

    useEffect(() => {
        fetchTeeTimes(date);
    }, [date]);

    const fetchTeeTimes = async (selectedDate: string) => {
        try {
            const response = await axios.get<TeeTime[]>(`${endpoints.VIEW_ALL_TEE_TIMES}?date=${selectedDate}`);
            setTeeTimes(response.data);
        } catch (error) {
            console.error('Failed to fetch tee times', error);
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    return (
        <div className="staff-dashboard">
            <h1>Staff Dashboard - Golf Check-In</h1>
            <div>
                <h2>Today's Tee Sheet</h2>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                />
                <div className="tee-time-list">
                    {teeTimes.map((teeTime, index) => (
                        <div key={index} className={`tee-time-item ${teeTime.booked ? 'booked' : 'available'}`}>
                            {new Date(teeTime.start_time).toLocaleTimeString()}
                        </div>
                    ))}
                </div>
            </div>
            {/* Link to the Generate Tee Times page */}
            <Link to="/staff/generate-tee-times">Generate Tee Times</Link>
        </div>
    );
};

export default StaffDashboard;
