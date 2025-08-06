import axios from 'axios';

const API_URL = 'http://localhost:5000/api/attendance';

export const getAttendance = () => axios.get(API_URL);

export const markAttendance = (data) => axios.post(API_URL, data);
