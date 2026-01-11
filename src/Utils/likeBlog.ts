// Utils/likeBlog.ts
import { AppDispatch } from "@/store/store";
import { updateBlogLikes } from "@/store/features/counterSlice";
import toast from "react-hot-toast";


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export const likeBlog = (blogId: string) =>
    async (dispatch: AppDispatch) => {
        try {
            const res = await fetch(`${API_URL}/api/blogs/${blogId}/like`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json"
                },
            });

            if (!res.ok) {
                throw new Error('Failed to like blog');
            }
            toast.success("Blog liked ❤️")


            const updatedBlog = await res.json();
            
            // Update Redux with the new like count
            dispatch(updateBlogLikes({ blogId, likes: updatedBlog.likes }));
            
            return updatedBlog;
        } catch (error) {
            toast.error("Failed to like blog");
            console.error("Error liking blog:", error);
            throw error;
        }
    };