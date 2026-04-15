import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const getAllFollowerList = async (username) => {
  const response = await axiosInstance("/followee" + username);
  console.log("response for follower list", response);
  return response.data;
};

export const getAllFollowingList = async (username) => {
  const response = await axiosInstance("/following" + username);
  console.log("res for following list", response);
  return response.data;
};
