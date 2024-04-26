import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom'; 

interface MemberDetails {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    address?: string;
    membership_type?: string;
}

const ProfileView: React.FC = () => {
    const { user } = useUser();
    const [memberDetails, setMemberDetails] = useState<MemberDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // For routing to other pages

    useEffect(() => {
        if (user && user.memberId) {
            fetchMemberDetails(user.memberId);
        }
    }, [user]);

    const fetchMemberDetails = async (memberId: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get<MemberDetails>(`${endpoints.GET_MEMBER_BY_ID}/${memberId}`);
            setMemberDetails(response.data);
        } catch (error) {
            console.error('Failed to fetch member details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMemberDetails(prev => ({
            ...prev!,
            [name]: value
        }));
    };

    const updateMemberDetails = async () => {
        if (memberDetails) {
            setIsLoading(true);
            try {
                await axios.put(`${endpoints.UPDATE_MEMBER}/${memberDetails.id}`, memberDetails);
                alert('Member details updated successfully.');
            } catch (error) {
                console.error('Failed to update member details:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const goBack = () => {
        navigate('/member-dashboard'); 
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!memberDetails) {
        return <div>No member data available.</div>;
    }

    return (
        <div className='profilecontainer'>
            <h1>Your Profile</h1>
            <label>
                First Name:
                <input type="text" value={memberDetails.first_name} name="first_name" onChange={handleInputChange} />
            </label>
            <label>
                Last Name:
                <input type="text" value={memberDetails.last_name} name="last_name" onChange={handleInputChange} />
            </label>
            <label>
                Email:
                <input type="email" value={memberDetails.email} name="email" onChange={handleInputChange} />
            </label>
            <label>
                Phone:
                <input type="text" value={memberDetails.phone || ''} name="phone" onChange={handleInputChange} />
            </label>
            <label>
                Address:
                <input type="text" value={memberDetails.address || ''} name="address" onChange={handleInputChange} />
            </label>
            <label>
                Membership Type:
                <input type="text" value={memberDetails.membership_type || ''} name="membership_type" onChange={handleInputChange} readOnly />
            </label>
            <button onClick={updateMemberDetails}>Update</button>
            <button onClick={goBack}>Back</button>
        </div>
    );
};

export default ProfileView;
