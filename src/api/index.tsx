import axios, { AxiosInstance } from 'axios';

// Define a type for the Axios instance configuration
interface AxiosConfig {
  baseURL: string;
  headers: {
    'Accept': string;
    'Content-Type': string;
  };
}

const headers: any = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

if(localStorage.getItem("accessToken")) {
  headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`
}

// Create an Axios instance with the specified configuration
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: headers
});

export default api;







