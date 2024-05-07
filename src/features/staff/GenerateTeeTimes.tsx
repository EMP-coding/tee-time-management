import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';

interface Course {
    id: number;
    course_name: string;
    // Include any other properties of courses that you might use
}

const GenerateTeeTimes: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const [date, setDate] = useState<string>(''); 
    const [startTime, setStartTime] = useState<string>('08:00');
    const [endTime, setEndTime] = useState<string>('17:00');
    const [intervalMinutes, setIntervalMinutes] = useState<number>(10);

    const clubId = localStorage.getItem('clubID'); // Get clubId from storage
    console.log("Club ID:", clubId);

    useEffect(() => {
        const fetchCourses = async () => {
            if (clubId) {
                try {
                    const response = await axios.get(`${endpoints.GET_COURSES_BY_CLUB_ID.replace('{club_id}', clubId)}`);
                    console.log("Courses fetched:", response.data);
                    setCourses(response.data); // Assuming response.data is an array of Course objects
                } catch (error) {
                    console.error('Failed to fetch courses', error);
                    alert('Error fetching courses.');
                }
            }
        };
        fetchCourses();
    }, [clubId]);

    const generateTeeTimes = async () => {
        const formattedStartTime = `${date} ${startTime}`;
        const formattedEndTime = `${date} ${endTime}`;
        const data = {
            course_id: parseInt(selectedCourseId),
            start_time: formattedStartTime,
            end_time: formattedEndTime,
            interval_minutes: intervalMinutes
        };

        try {
            const response = await axios.post(endpoints.GENERATE_TEE_TIMES, data);
            alert(response.data.message);
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
                    Select Course:
                    <select
                        value={selectedCourseId}
                        onChange={e => setSelectedCourseId(e.target.value)}
                    >
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.course_name}
                            </option>
                        ))}
                    </select>
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
