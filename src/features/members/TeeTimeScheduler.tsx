import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';

interface TeeTime {
    id: number;
    start_time: string;
    end_time?: string; // Optional if you don't always get an end time
    course_name: string; // Assuming you've updated backend to send this
    available_slots: number;
    total_slots: number;
}

const TeeTimeScheduler: React.FC = () => {
    const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);

    useEffect(() => {
        const fetchTeeTimes = async () => {
            try {
                const response = await axios.get<TeeTime[]>(endpoints.AVAIL_TEE_TIMES);
                setTeeTimes(response.data);
            } catch (error) {
                console.error('Error fetching tee times:', error);
                // Optionally handle the error e.g., show an error message
            }
        };

        fetchTeeTimes();
    }, []);

    return (
        <div>
            <h2>Available Tee Times</h2>
            <ul>
                {teeTimes.map((teeTime) => (
                    <li key={teeTime.id} className="tee-time-item">
                        <div className="time-display">
                            {new Date(teeTime.start_time).toLocaleTimeString([], { timeStyle: 'short' })}
                        </div>
                        <div className="slots-container">
                            {[...Array(teeTime.total_slots)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`slot ${index < teeTime.available_slots ? 'slot-available' : 'slot-filled'}`}
                                    style={{ width: `${100 / teeTime.total_slots}%` }}
                                ></div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeeTimeScheduler;
