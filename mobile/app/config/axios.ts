import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
