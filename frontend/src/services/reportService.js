import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports';

export const getReports = () => axios.get(API_URL);

export const createReport = (reportData) => axios.post(API_URL, reportData);
