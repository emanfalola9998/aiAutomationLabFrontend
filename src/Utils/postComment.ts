// Utils/postComment.ts
import { AppDispatch } from "@/store/store";
import { addCommentForBlog } from "@/store/features/counterSlice";

export const postCommentForBlog = (blogId: string, comment: any) =>
    async (dispatch: AppDispatch) => {
        const res = await fetch(`/blogs/${blogId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment),
        });

        const newComment = await res.json();
        dispatch(addCommentForBlog(newComment));
    };
