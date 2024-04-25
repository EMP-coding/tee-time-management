// TeeTimeScheduler.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../API/apiendpoints';
import { useUser } from '../../context/UserContext';
import { isUserSignedIn } from '../../auth/authentication';
import './members.css';

interface TeeTime {
    id: number;
    start_time: string;
    end_time?: string;
    course_name: string;
    available_slots: number;
    total_slots: number;
}

const TeeTimeScheduler: React.FC = () => {
    const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching tee times for date:", selectedDate);
        const fetchTeeTimes = async () => {
            try {
                const response = await axios.get<TeeTime[]>(`${endpoints.AVAIL_TEE_TIMES}?date=${selectedDate}`);
                setTeeTimes(response.data);
                console.log("Tee times fetched:", response.data);
            } catch (error) {
                console.error('Error fetching tee times:', error);
            }
        };
        fetchTeeTimes();
    }, [selectedDate]);

    // Filter tee times based on the selected date
    const filteredTeeTimes = teeTimes.filter(tt => {
        // Assuming start_time is in ISO date format, so we compare it with selectedDate
        return tt.start_time.split('T')[0] === selectedDate;
    });

    const handleTeeTimeClick = (teeTimeId: number): void => {
        if (isUserSignedIn()) {
            console.log("User is signed in, confirming reservation...");
            const selectedTeeTime = teeTimes.find(tt => tt.id === teeTimeId);
            if (selectedTeeTime) {
                if (selectedTeeTime.available_slots >= numberOfPlayers) {
                    console.log("Reserving tee time with ID:", teeTimeId);
                    reserveTeeTime(teeTimeId, user?.memberId || 0, numberOfPlayers);
                } else {
                    console.log("Not enough available slots for selected number of players.");
                }
            }
        } else {
            console.log("User not signed in, redirecting to login...");
            navigate('/members/login');
        }
    };

    const confirmReservation = (teeTimeId: number, memberId: number): void => {
        const confirmReservation = window.confirm('Do you want to reserve the selected tee time?');
        if (confirmReservation) {
            console.log("User confirmed reservation, processing...");
            reserveTeeTime(teeTimeId, memberId, numberOfPlayers);
        }
    };

    const reserveTeeTime = async (teeTimeId: number, memberId: number, playersToReserve: number): Promise<void> => {
        console.log(`Attempting to reserve tee time with ID: ${teeTimeId} for memberId: ${memberId}`);
        try {
            const response = await axios.post(endpoints.RESERVE_TEE_TIME, {
                tee_time_id: teeTimeId,
                member_id: memberId,
                players: playersToReserve
            });
            console.log('Server response:', response);
            if (response.status === 201) {
                console.log('Reservation successful:', response.data);
                alert('Tee time reserved successfully!');
            } else {
                console.error('Reservation failed:', response.data);
                alert('Failed to reserve tee time.');
            }
        } catch (error) {
            console.error('Error making reservation:', error);
            alert('Failed to reserve tee time. Please try again.');
        }
    };

    const sortedTeeTimes = filteredTeeTimes.sort((a, b) => {
        return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
    });
    
    return (
        <div className="tee-time-scheduler">
            <h2>Available Tee Times</h2>
            <div>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => {
                        console.log("Date selected:", e.target.value);
                        setSelectedDate(e.target.value);
                    }}
                />
            </div>
            <div>
                <label htmlFor="players">Number of Players:</label>
                <select
                    id="players"
                    value={numberOfPlayers}
                    onChange={(e) => {
                        console.log("Number of players selected:", e.target.value);
                        setNumberOfPlayers(parseInt(e.target.value, 10));
                    }}
                >
                    {[1, 2, 3, 4].map(number => (
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select>
            </div>
            <div className="tee-times-container">
    {sortedTeeTimes.map((teeTime) => (
        <div key={teeTime.id} className={`tee-time-item ${numberOfPlayers > teeTime.available_slots ? 'unavailable' : ''}`}>
            <div className="time-display">
                {new Date(teeTime.start_time).toLocaleTimeString([], { timeStyle: 'short' })}
            </div>
            <div className="slots-container">
                {[...Array(teeTime.total_slots)].map((_, index) => {
                    const isAvailable = index < teeTime.available_slots;
                    const isSelected = index < numberOfPlayers;
                    const isDisabled = index >= numberOfPlayers || !isAvailable;

                    return (
                        <button
                            key={index}
                            onClick={() => handleTeeTimeClick(teeTime.id)}
                            className={`slot ${isAvailable ? 'slot-available' : 'slot-filled'} ${isSelected ? 'slot-selected' : ''}`}
                            disabled={isDisabled}
                        >
                            Player {index + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    ))}
</div>
        </div>
    );
};

export default TeeTimeScheduler;
