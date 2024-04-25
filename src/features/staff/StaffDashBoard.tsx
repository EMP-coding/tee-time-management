
import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface Member {
    id: number;
    name: string;
  }
  
  interface TeeTime {
    id: number;
    start_time: string;
  }

  const StaffDashboard: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [teeTimes, setTeeTimes] = useState<TeeTime[]>([]);
    const [selectedTeeTime, setSelectedTeeTime] = useState<TeeTime | null>(null);
  
    // Fetch members data from your API
    useEffect(() => {
      const fetchMembers = async () => {
        try {
          const response = await axios.get<Member[]>('/api/members');
          setMembers(response.data);
        } catch (error) {
          console.error('Failed to fetch members', error);
          // Consider how you might handle errors visually in the UI
        }
      };
  
      fetchMembers();
    }, []);
  
    // Fetch tee times data from your API
    useEffect(() => {
      const fetchTeeTimes = async () => {
        try {
          const response = await axios.get<TeeTime[]>('/api/tee-times');
          setTeeTimes(response.data);
        } catch (error) {
          console.error('Failed to fetch tee times', error);
          // Consider adding error state and displaying error messages in the UI
        }
      };
  
      fetchTeeTimes();
    }, []);
  
    const handleMemberSelection = (member: Member) => {
      setSelectedMember(member);
    };
  
    const handleTeeTimeSelection = (teeTime: TeeTime) => {
      setSelectedTeeTime(teeTime);
    };
  
    const handleCheckIn = () => {
      if (selectedMember && selectedTeeTime) {
        console.log(`Checking in ${selectedMember.name} for tee time at ${selectedTeeTime.start_time}`);
        // Implement the API call to check in the member here
        // Ensure you handle success and error responses appropriately
      } else {
        alert('Please select a member and a tee time.');
      }
    };
  
    return (
      <div>
        <h1>Staff Dashboard - Golf Check-In</h1>
        <input
          type="text"
          placeholder="Search Members"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <h2>Members</h2>
          {members.filter(member => member.name.toLowerCase().includes(searchQuery.toLowerCase())).map(member => (
            <div key={member.id} onClick={() => handleMemberSelection(member)}>
              {member.name}
            </div>
          ))}
        </div>
        <div>
          <h2>Tee Times</h2>
          {teeTimes.map(teeTime => (
            <div key={teeTime.id} onClick={() => handleTeeTimeSelection(teeTime)}>
              {teeTime.start_time}
            </div>
          ))}
        </div>
        <button onClick={handleCheckIn}>Check In</button>
      </div>
    );
  };
  
  export default StaffDashboard;