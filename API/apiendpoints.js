const API_BASE_URL = 'http://localhost:5000'; // Base URL for your Flask API

export const endpoints = {
    GET_MEMBERS: `${API_BASE_URL}/members/all`, // Endpoint to get all members
    CREATE_MEMBER: `${API_BASE_URL}/create/member`, // Endpoint to create a new member
    REGISTER_MEMBER: `${API_BASE_URL}/members/register`, // Endpoint to register a new member
    LOGIN_MEMBER: `${API_BASE_URL}/members/login`, // Endpoint to authenticate a member
};