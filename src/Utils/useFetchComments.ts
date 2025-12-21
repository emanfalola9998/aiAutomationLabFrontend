import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "./fetchBlogs";
import { setIsLoading } from "@/store/features/counterSlice";
import { fetchCommentsForBlog } from "./fetchCommentsForBlog";

    export const useFetchComments = (id: string) => {
        const allComments = useSelector((state:RootState) => state.ai.commentsByBlog)
        const dispatch = useDispatch<AppDispatch>()
        const commentsPerBlog = allComments[id] ?? [];
        
        useEffect(() => {
            if (commentsPerBlog.length === 0) {
                dispatch(fetchCommentsForBlog(id)).finally(() => dispatch(setIsLoading(false)));
            } 
            else {
                dispatch(setIsLoading(false));
            }

        }, [dispatch, commentsPerBlog.length, id]);
        
        return commentsPerBlog
    }

