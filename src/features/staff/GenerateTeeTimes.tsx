import React, { useState } from 'react';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';

const GenerateTeeTimes: React.FC = () => {
    const [courseId, setCourseId] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('08:00');
    const [endTime, setEndTime] = useState<string>('17:00');
    const [intervalMinutes, setIntervalMinutes] = useState<number>(10);

    const generateTeeTimes = async () => {
        const data = {
            course_id: parseInt(courseId),
            start_time: startTime,
            end_time: endTime,
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
        <div>
            <h1>Generate Tee Times</h1>
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
    );
};

export default GenerateTeeTimes;
