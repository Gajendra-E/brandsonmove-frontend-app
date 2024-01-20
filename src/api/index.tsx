import axios, { AxiosInstance } from 'axios';
import {BACKEND_APP_URL} from "../config/config"

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
  baseURL: "/",
  headers: headers
});

export default api;