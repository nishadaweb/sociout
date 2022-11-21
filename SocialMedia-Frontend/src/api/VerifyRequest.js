import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
export const verifyOtp = (data) => API.post("/auth/verifyotp", { data });
