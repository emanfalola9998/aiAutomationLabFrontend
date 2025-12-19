import { incrementCommentRating } from "@/store/features/counterSlice";
import { AppDispatch, RootState } from "@/store/store";
import { updateCommentRating } from "./updateCommentRating";

export const rateCommentForBlog = (blogId: string, commentId: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {

        // Get current rating from Redux
        const currentRating = getState().ai.commentsByBlog[blogId]
            ?.find(c => c.id === commentId)?.rating ?? 0;

        // 🔹 1. Optimistic UI update
        dispatch(incrementCommentRating({ blogId, commentId }));

        try {
            // 🔹 2. Backend request
            const res = await fetch(`/blogs/${blogId}/comments/${commentId}`, {
                method: "POST",   // If this endpoint increments rating
            });

            const updated = await res.json();

            // 🔹 3. Update Redux with real DB rating
            dispatch(updateCommentRating(
                blogId,
                commentId,
                updated.rating
            ));

        } catch (error) {
            console.error("Rating update failed:", error);
        }
    };