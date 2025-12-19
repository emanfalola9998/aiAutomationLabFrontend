import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "./fetchBlogs";
import { setIsLoading } from "@/store/features/counterSlice";

    export const useFetchBlogs = () => {
        const allBlogs = useSelector((state:RootState) => state.ai.allBlogs)
        const dispatch = useDispatch<AppDispatch>()
        
        useEffect(() => {
            if (allBlogs.length === 0) {
            dispatch(fetchBlogs()).finally(() => dispatch(setIsLoading(false)));
            } else {
            dispatch(setIsLoading(false));
            }
        }, [dispatch, allBlogs.length]);
        
        return allBlogs
    }

