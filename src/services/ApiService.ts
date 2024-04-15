import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});
export default instance;
