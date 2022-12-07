import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
export const search = (searchData) => {
  console.log(searchData, "se");
  return API.get(`/user/search?data=${searchData}`);
};

export const getUser = (userId) => {
  return API.get(`/user/${userId}`);
};
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUser = () => API.get("/user");
export const followUser = (id, data) => {
  console.log(id, "idddddd");
  API.put(`/user/${id}/follow`, data);
};
export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
