import axios, { AxiosInstance } from 'axios';

// Define a type for the Axios instance configuration
interface AxiosConfig {
  baseURL: string;
  headers: {
    'Accept': string;
    'Content-Type': string;
  };
}

// Create an Axios instance with the specified configuration
const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;