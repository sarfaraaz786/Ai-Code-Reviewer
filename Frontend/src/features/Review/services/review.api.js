import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

/**
 * @description Sending Code to Ai for review
 */
export const getAiReview = async (code) => {
  const response = await api.post("/ai/get-review", { code });
  return response.data;
};