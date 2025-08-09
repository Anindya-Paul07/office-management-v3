import axios from 'axios';

const API_DESIGNATIONS = 'http://localhost:5000/api/designations';

export const getDesignations = () => axios.get(API_DESIGNATIONS);
export const createDesignation = (data) => axios.post(API_DESIGNATIONS, data);
export const updateDesignation = (id, data) => axios.put(`${API_DESIGNATIONS}/${id}`, data);
export const deleteDesignation = (id) => axios.delete(`${API_DESIGNATIONS}/${id}`);

export const assignDesignationToEmployee = (employeeId, designationId) =>
  axios.put(`${API_DESIGNATIONS}/assign/${employeeId}`, { designationId });
