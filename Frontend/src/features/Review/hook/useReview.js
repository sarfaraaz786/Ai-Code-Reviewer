import { getAiReview } from "../services/review.api";

export const useReview = () => {

    const getReview = async(code) => {
        try {
            const response = await getAiReview(code);
            return response;
        } catch(error) {
            console.log(error);
        }
    } 
    return { getReview };
}
