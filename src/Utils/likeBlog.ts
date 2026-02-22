// utils/likeBlog.ts
import { AppDispatch } from "@/store/store";
import { AuthService } from "@/lib/auth";
import { setAllBlogs } from "@/store/features/counterSlice";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export const likeBlog = (blogId: string) => async (dispatch: AppDispatch) => {
    try {
        const token = AuthService.getToken();
        
        if (!token) {
        toast.error('Please login to like blogs');
        throw new Error('Not authenticated');
        }

        console.log('Liking blog with token:', token); // Debug log

        const res = await fetch(`${API_URL}/api/blogs/${blogId}/like`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        });

        console.log('Response status:', res.status); // Debug log

        if (res.status === 401) {
        toast.error('Session expired. Please login again');
        AuthService.logout();
        window.location.href = '/login';
        throw new Error('Unauthorized');
        }

        if (!res.ok) {
        const errorData = await res.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to like blog');
        }

        const updatedBlog = await res.json();

        // Fetch all blogs to update the list
        const allBlogsResponse = await fetch(`${API_URL}/api/blogs`);
        const allBlogs = await allBlogsResponse.json();
        dispatch(setAllBlogs(allBlogs));

        toast.success('Blog liked! ❤️');
        
        return updatedBlog;
    } catch (error: any) {
        console.error('Error liking blog:', error);
        if (error.message !== 'Not authenticated' && error.message !== 'Unauthorized') {
        toast.error('Failed to like blog');
        }
        throw error;
    }
};