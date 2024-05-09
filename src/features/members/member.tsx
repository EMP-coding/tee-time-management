import axios from 'axios';
import { endpoints } from '../../API/apiendpoints';

export const fetchMemberDetails = async (memberId: number) => {
  try {
    const response = await axios.get(`${endpoints.GET_MEMBER_BY_ID}/${memberId}`);
    return response.data;  // Return the member details directly
  } catch (error) {
    console.error('Failed to fetch member details:', error);
    throw error;  // Rethrow to handle it in the component
  }
};
