// Utils/postComment.ts
import { AppDispatch } from "@/store/store";
import { setCommentsForBlog, setIsLoading } from "@/store/features/counterSlice";
import { Comments } from "../../types";
import { AuthService } from "@/lib/auth";
import toast from "react-hot-toast";


export const postCommentForBlog = (blogId: string, comment: any) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch(setIsLoading(true));
            

            
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blogs/${blogId}/comments`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${AuthService.getToken()}`
                },
                body: JSON.stringify(comment),
            });


            if (!res.ok) {
                const errorText = await res.text();
                console.error('Error response:', errorText);
                throw new Error('Failed to create comment');
            }

            const newComment = await res.json();

            // Fetch all comments
            const allCommentsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blogs/${blogId}/comments`);
            const allComments: Comments[] = await allCommentsResponse.json();

            // Update Redux
            dispatch(setCommentsForBlog({ blogId, comments: allComments }));
            toast.success("Comment Created ❤️")


            return newComment;
        } catch (error) {
            toast.error("Failed to create comment");
            console.error("Error creating comment: ", error);
            throw error;
        } finally {
            dispatch(setIsLoading(false));
        }
    };
