import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../API/apiendpoints';
import { useUser } from '../../context/UserContext';
import { getMemberId } from '../../auth/authentication';
import './members.css';

interface TeeTime {
    id: number;
    start_time: string;
    end_time?: string;
    course_name: string;
    available_slots: number;
    total_slots: number;
}

interface Course {
    id: number;
    course_name: string;
}
const TeeTimeScheduler: React.FC = () => {
    const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
    const navigate = useNavigate();

    

    useEffect(() => {
        const fetchTeeTimes = async () => {
            try {
                const response = await axios.get<TeeTime[]>(`${endpoints.AVAIL_TEE_TIMES}?date=${selectedDate}`);
                setTeeTimes(response.data);
            } catch (error) {
                console.error('Error fetching tee times:', error);
            }
        };
        fetchTeeTimes();
    }, [selectedDate]);

    const currentDateTime = new Date();

    const sortedTeeTimes = teeTimes
        .filter(tt => tt.start_time.split('T')[0] === selectedDate)
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

    const handleTeeTimeClick = (teeTimeId: number): void => {
        const confirmation = window.confirm("Are you sure you want to reserve this tee time?");
        if (confirmation) {
            const memberId = getMemberId();
            if (memberId) {
                const selectedTeeTime = teeTimes.find(tt => tt.id === teeTimeId);
                if (selectedTeeTime && selectedTeeTime.available_slots >= numberOfPlayers) {
                    reserveTeeTime(teeTimeId, memberId, numberOfPlayers);
                } else {
                    console.log("Not enough available slots for selected number of players.");
                }
            } else {
                navigate('/members/login');
            }
        }
    };

    const reserveTeeTime = async (teeTimeId: number, memberId: number, playersToReserve: number): Promise<void> => {
        try {
            const payload = {
                tee_time_id: teeTimeId,
                member_id: memberId,
                players: playersToReserve
            };
    
            const response = await axios.post<void>(endpoints.RESERVE_TEE_TIME, payload);
            if (response.status === 201) {
                alert('Tee time reserved successfully!');
            } else {
                alert('Failed to reserve tee time.');
            }
        } catch (error) {
            alert('Failed to reserve tee time. Please try again.');
            console.error('Error making reservation:', error);
        }
    };

    return (
        <div className="tee-time-scheduler">
            <h2>Available Tee Times</h2>
            <div>
                <button onClick={() => navigate('/member-dashboard')} className="back-button">
                    Back to Dashboard
                </button>
            </div>
            <div>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="players">Number of Players:</label>
                <select
                    id="players"
                    value={numberOfPlayers}
                    onChange={(e) => setNumberOfPlayers(parseInt(e.target.value, 10))}
                >
                    {[1, 2, 3, 4].map(number => (
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select>
            </div>
            <div className="tee-times-container">
                {sortedTeeTimes.map((teeTime) => {
                    const teeTimeDate = new Date(teeTime.start_time);
                    const isPast = teeTimeDate < currentDateTime;
                    return (
                        <div key={teeTime.id} className={`tee-time-item ${numberOfPlayers > teeTime.available_slots ? 'unavailable' : ''} ${isPast ? 'tee-time-past' : ''}`}>
                            <div className="time-display">
                                {teeTimeDate.toLocaleTimeString([], { timeStyle: 'short' })}
                            </div>
                            <div className="slots-container">
                                {[...Array(teeTime.total_slots)].map((_, index) => {
                                    const isAvailable = index < teeTime.available_slots;
                                    const isSelected = index < numberOfPlayers;
                                    const isDisabled = index >= numberOfPlayers || !isAvailable || isPast;

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => isDisabled ? null : handleTeeTimeClick(teeTime.id)}
                                            className={`slot ${isAvailable ? 'slot-available' : 'slot-filled'} ${isSelected ? 'slot-selected' : ''}`}
                                            disabled={isDisabled}
                                        >
                                            Player {index + 1}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TeeTimeScheduler;
