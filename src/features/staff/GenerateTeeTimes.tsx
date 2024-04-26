import React, { useState } from 'react';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';
import './staff.css';

const GenerateTeeTimes: React.FC = () => {
    const [courseId, setCourseId] = useState<string>('');
    const [date, setDate] = useState<string>(''); // Add state for the date
    const [startTime, setStartTime] = useState<string>('08:00');
    const [endTime, setEndTime] = useState<string>('17:00');
    const [intervalMinutes, setIntervalMinutes] = useState<number>(10);

    const generateTeeTimes = async () => {
        // Format start_time and end_time with the selected date
        const formattedStartTime = `${date} ${startTime}`;
        const formattedEndTime = `${date} ${endTime}`;

        const data = {
            course_id: parseInt(courseId),
            start_time: formattedStartTime,
            end_time: formattedEndTime,
            interval_minutes: intervalMinutes
        };
        try {
            const response = await axios.post(endpoints.GENERATE_TEE_TIMES, data);
            alert(response.data.message);
            // Optionally, you can add logic here to handle the response
        } catch (error) {
            console.error('Failed to generate tee times', error);
            alert('Error generating tee times.');
        }
    };

    return (
        <div className='generate-title'>
            <h1>Generate Tee Times</h1>
        <div className="generate-tee-times-container">
    
            <label>
                Course ID:
                <input
                    type="number"
                    value={courseId}
                    onChange={e => setCourseId(e.target.value)}
                    placeholder="Course ID"
                />
            </label>
            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </label>
            <label>
                Start Time:
                <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                />
            </label>
            <label>
                End Time:
                <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                />
            </label>
            <label>
                Interval Minutes:
                <input
                    type="number"
                    value={intervalMinutes}
                    onChange={e => setIntervalMinutes(parseInt(e.target.value))}
                    placeholder="Interval in minutes"
                />
            </label>
            <button onClick={generateTeeTimes}>Generate Tee Times</button>
        </div>
        </div>
    );
};

export default GenerateTeeTimes;
