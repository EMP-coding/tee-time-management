import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';
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
        fetchTeeTimes(date); // Fetch tee times based on the selected date
    }, [date]); // useEffect dependency array includes date to refetch when it changes

    const fetchTeeTimes = async (selectedDate: string) => {
        try {
            const response = await axios.get<TeeTime[]>(`${endpoints.VIEW_ALL_TEE_TIMES}`);
            // Filter tee times for the selected date
            const filteredTeeTimes = response.data.filter((teeTime) => {
                const teeDate = new Date(teeTime.start_time).toISOString().split('T')[0];
                return teeDate === selectedDate; // Compare with selectedDate instead of the current date
            });
            setTeeTimes(filteredTeeTimes);
        } catch (error) {
            console.error('Failed to fetch tee times', error);
        }
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value); // This will trigger useEffect to refetch the tee times
    };
    const navigate = useNavigate(); 
    const goToGenerateTeeTimes = () => {
        navigate('/staff/generate-tee-times');
    };
    return (
        <div className="staff-dashboard">
            <h1>Staff Dashboard </h1>
            <div>
                <h2>Tee Sheet Viewer</h2>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                />
                <div className="tee-time-list2">
                    {teeTimes.map((teeTime, index) => (
                        <div key={index} className={`tee-time-item2 ${teeTime.booked ? 'booked' : 'available'}`}>
                            {new Date(teeTime.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        
                    ))}
                </div>
            </div>
            {/* Other contents */}<button onClick={goToGenerateTeeTimes} className="btn-generate-tee-times">
                Generate Tee Times
            </button>
        </div>
    );
};

export default StaffDashboard;