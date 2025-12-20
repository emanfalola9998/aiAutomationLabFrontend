// utils/postBlog.ts

import { AppDispatch } from "@/store/store";
import { addBlog, setAllBlogs, setIsLoading } from "@/store/features/counterSlice";
import { AuthService } from "@/lib/auth";

export interface CreateBlogData {
    title: string;
    content: string;
    image: string;
    tags: string;
    author: string | undefined
}

export const createBlog = (blogData: CreateBlogData) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));
            console.log('API_BASE:', process.env.NEXT_PUBLIC_API_BASE);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${AuthService.getToken()}` // Include auth token
                },
                body: JSON.stringify(blogData),
            });


            if (!response.ok) {
                throw new Error('Failed to create blog');
            }

            const newBlog = await response.json();
            
            // After creating, fetch all blogs from backend
            const allBlogsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
            const allBlogs = await allBlogsResponse.json();
            
            // Update Redux with all blogs from backend
            dispatch(setAllBlogs(allBlogs));
            
            return newBlog; // Return the created blog
        } catch (error) {
            console.error('Error creating blog:', error);
            throw error;
        } finally {
            dispatch(setIsLoading(false));
        }
    };