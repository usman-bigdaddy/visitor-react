// Example: services/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.example.com", // Your API base URL
  timeout: 5000, // Timeout for requests (adjust as needed)
});

export default instance;
