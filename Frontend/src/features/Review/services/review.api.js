import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

/**
 * @description Sending Code to Ai for review
 */
export const getAiReview = async (code) => {
  const response = await api.post("/ai/get-review", { code });
  return response.data;
};