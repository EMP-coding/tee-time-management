import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../../API/apiendpoints';
import './teetimescheduler.css';

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
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
    const navigate = useNavigate();

    // Fetch courses based on club ID
    useEffect(() => {
        const clubId = localStorage.getItem('clubID'); // Make sure clubID is, in fact, in local storage...
        if (clubId) {
            axios.get<Course[]>(`${endpoints.GET_COURSES_BY_CLUB_ID.replace('{club_id}', clubId)}`)
                .then(response => setCourses(response.data))
                .catch(error => console.error('Error fetching courses:', error));
        }
    }, []);

    
useEffect(() => {
    if (selectedCourseId) {
        axios.get<TeeTime[]>(`${endpoints.AVAIL_TEE_TIMES}?date=${selectedDate}&course_id=${selectedCourseId}`)
            .then(response => {
                // Check if the response actually contains data
                if (response.data && response.data.length > 0) {
                    setTeeTimes(response.data);
                } else {
                    // No tee times found, set an empty array to trigger the no data message
                    setTeeTimes([]);
                }
            })
            .catch(error => {
                console.error('Error fetching tee times:', error);
                setTeeTimes([]); 
            });
    } else {
        // No course selected, clear tee times
        setTeeTimes([]);
    }
}, [selectedDate, selectedCourseId]); // Ensures useEffect runs when these change

    const handleTeeTimeClick = (teeTimeId: number): void => {
        const confirmation = window.confirm("Are you sure you want to reserve this tee time?");
        if (confirmation) {
            const memberId = localStorage.getItem('memberId'); // memberId should be stored in localStorage as coded in MemberLogin.tsx
            if (memberId) {
                reserveTeeTime(teeTimeId, parseInt(memberId), numberOfPlayers);
            } else {
                navigate('/members/login');
            }
        }
    };

    const reserveTeeTime = async (teeTimeId: number, memberId: number, playersToReserve: number): Promise<void> => {
        try {
            const payload = { tee_time_id: teeTimeId, member_id: memberId, players: playersToReserve };
            const response = await axios.post(endpoints.RESERVE_TEE_TIME, payload);
            if (response.status === 201) {
                alert('Tee time reserved successfully!');
                setTeeTimes(prev => prev.filter(tt => tt.id !== teeTimeId)); 
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
            <div className="selection-area">
                <div>
                    <label htmlFor="course">Course:</label>
                    <select id="course" value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                        <option value="">Select a course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.course_name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="players">Number of Players:</label>
                    <select id="players" value={numberOfPlayers} onChange={(e) => setNumberOfPlayers(parseInt(e.target.value, 10))}>
                        {[1, 2, 3, 4].map(number => (
                            <option key={number} value={number}>{number}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="tee-times-container">
                {teeTimes.length > 0 ? (
                    teeTimes.map((teeTime) => (
                        <div key={teeTime.id} className={`tee-time-item ${new Date(teeTime.start_time) < new Date() ? 'tee-time-past' : ''}`}>
                            <div className="time-display">
                                {new Date(teeTime.start_time).toLocaleTimeString([], { timeStyle: 'short' })}
                            </div>
                            <div className="slots-container">
                                {[...Array(teeTime.total_slots)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleTeeTimeClick(teeTime.id)}
                                        disabled={index >= teeTime.available_slots || new Date(teeTime.start_time) < new Date()}
                                        className={`slot ${index < teeTime.available_slots ? (index < numberOfPlayers ? 'slot-available' : 'slot-unavailable') : 'slot-filled'} ${index < numberOfPlayers ? 'slot-selected' : ''}`}
                                    >
                                        Player {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tee times available for the selected date and course.</p>
                )}
            </div>
        </div>
    );
    
};

export default TeeTimeScheduler;
