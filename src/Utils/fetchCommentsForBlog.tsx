// Utils/fetchCommentsPerBlog.ts
import { AppDispatch } from "@/store/store";
import { setCommentsForBlog } from "@/store/features/counterSlice";

export const fetchCommentsForBlog = (blogId: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blogs/${blogId}/comments`);
        const data = await res.json();

        dispatch(setCommentsForBlog({ blogId, comments: data }));

    } catch (err) {
        console.error("Error fetching comments:", err);
    }
};
