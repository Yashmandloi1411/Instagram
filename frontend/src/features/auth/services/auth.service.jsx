import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(username, email, password) {
  try {
    const response = await axiosInstance.post("/register", {
      username,
      password,
      email,
    });

    console.log("response for register", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
}

export async function login(identifier, password) {
  try {
    const response = await axiosInstance.post("/login", {
      identifier,
      password,
    });

    console.log("response login", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getMe() {
  try {
    const response = await axiosInstance(
      "http://localhost:3000/api/auth/get-me",
    );
    console.log("response for getMe", response);
    return response;
  } catch (error) {
    console.log("error whilte get data", error);
  }
}
