const API_BASE_URL = 'http://localhost:5000'; 

export const endpoints = {
    GET_MEMBERS: `${API_BASE_URL}/members/all`,
    CREATE_MEMBER: `${API_BASE_URL}/create/member`,
    REGISTER_MEMBER: `${API_BASE_URL}/members/register`,
    LOGIN_MEMBER: `${API_BASE_URL}/members/login`,
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
    GET_BOOKINGS_WITH_TEE_TIMES: `${API_BASE_URL}/tee-times/bookings`,
    VIEW_NEWS: `${API_BASE_URL}/news`,
    ADD_NEWS_ENDPOINT: `${API_BASE_URL}/news/add`,
    UPDATE_NEWS_ENDPOINT: `${API_BASE_URL}/news/update`,
    DELETE_NEWS_ENDPOINT: `${API_BASE_URL}/news/delete`
};