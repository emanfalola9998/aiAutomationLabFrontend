import { incrementCommentRating } from "@/store/features/counterSlice";
import { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";


export const rateCommentForBlog = (blogId: string, commentId: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

        // Get current rating from Redux
        const currentRating = getState().ai.commentsByBlog[blogId]?.find(c => c.id === commentId)?.rating ?? 0;

        // 🔹 1. Optimistic UI update
        dispatch(incrementCommentRating({ blogId, commentId }));

        try {
            const res = await fetch(`${API_URL}/api/blogs/${blogId}/comments/${commentId}/rating`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating: currentRating + 1})
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`HTTP ${res.status}: ${text}`);
            }

            // const updated = await res.json();
            toast.success("Comment liked ❤️");
            // console.log("updated: ", updated)

        } catch (error) {
            toast.error("Failed to like comment ")
            console.error("Rating update failed:", error);
        }
    };