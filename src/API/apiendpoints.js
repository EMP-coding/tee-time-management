
const API_BASE_URL = 'http://localhost:5000'; 

export const endpoints = {
    GET_MEMBERS: `${API_BASE_URL}/members/all`, // Endpoint to get all members
    CREATE_MEMBER: `${API_BASE_URL}/create/member`, // Endpoint to create a new member
    REGISTER_MEMBER: `${API_BASE_URL}/members/register`, // Endpoint to register a new member
    LOGIN_MEMBER: `${API_BASE_URL}/members/login`, // Endpoint to authenticate a member
    AVAIL_TEE_TIMES: `${API_BASE_URL}/tee-times/available`,
    RESERVE_TEE_TIME: `${API_BASE_URL}/tee-times/reserve`,
    STAFF_SIGN_IN: `${API_BASE_URL}/staff/fixedlogin`,
    VIEW_ALL_TEE_TIMES: `${API_BASE_URL}/tee-times/all`,
    GENERATE_TEE_TIMES: `${API_BASE_URL}/tee-times/generate`,
    GET_MEMBER_BY_ID: `${API_BASE_URL}/members/m`,
    UPDATE_MEMBER: `${API_BASE_URL}/members/update`,
    GET_BOOKING_BY_ID: `${API_BASE_URL}/tee-times`,
    DELETE_TEE_TIME: `${API_BASE_URL}/tee-times/{tee_time_id}/member/{member_id}`,
    GET_COURSES_BY_CLUB_ID: `${API_BASE_URL}/course/{club_id}`,
    GET_BOOKINGS_WITH_TEE_TIMES: `${API_BASE_URL}/tee-times/bookings`
};