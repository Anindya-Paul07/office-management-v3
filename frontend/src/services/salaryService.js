import axios from 'axios';

const API_URL = 'http://localhost:5000/api/salaries';

export const getSalaries = () => axios.get(API_URL);

export const createSalary = (salaryData) => axios.post(API_URL, salaryData);
