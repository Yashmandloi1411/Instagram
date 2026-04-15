import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/posts",
  withCredentials: true,
});

export const getAllFeeds = async () => {
  try {
    const response = await axiosInstance.get("/feeds");
    console.log("get all feed response", response);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const createPost = async ({ file, caption }) => {
  const formData = new FormData();
  formData.append("Image", file);
  formData.append("caption", caption);

  try {
    const response = await axiosInstance.post("/", formData);
    console.log("create post response", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const likePost = async (postId) => {
  try {
    const likedpost = await axiosInstance.post("/like/" + postId);
    console.log("likedpost", likedpost);
    return likedpost;
  } catch (error) {
    console.log("error", error);
  }
};

export const unlikePost = async (postId) => {
  try {
    const unlikedpost = await axiosInstance.post("/unlike/" + postId);
    console.log("unlikedpost", unlikedpost);
    return unlikedpost;
  } catch (error) {
    console.log("error", error);
  }
};
