import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks'; 

export const getTasks = () => axios.get(API_URL);

export const createTask = (taskData) => {
  const formData = new FormData();

  for (const key in taskData) {
    if (key === "attachments") {
      for (let file of taskData.attachments) {
        formData.append("attachments", file);
      }
    } else {
      formData.append(key, taskData[key]);
    }
  }

  return axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateTask = (id, taskData) => {
  const formData = new FormData();

  for (const key in taskData) {
    if (key === "attachments") {
      for (let file of taskData.attachments) {
        formData.append("attachments", file);
      }
    } else {
      formData.append(key, taskData[key]);
    }
  }

  return axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
