import { AppDispatch } from "@/store/store";
import { updateCommentRatingOptimistic } from "@/store/features/counterSlice";

export const updateCommentRating = (blogId: string, commentId: number, newRating: number) =>
    async (dispatch: AppDispatch) => {

    // Update instantly
    dispatch(updateCommentRatingOptimistic({ blogId, commentId, newRating }));

    try {
        await fetch(`/blogs/${blogId}/comments/${commentId}/rating`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating: newRating })
        });
    } catch (err) {
        console.error("Failed to update rating", err);
        // Optional: rollback logic if needed
    }
};
