"use client";

import { useSelector  } from "react-redux";
import { RootState } from "@/store/store";
import BlogClient from "./BlogClient";
import LandingSpinner from "@/Utils/LoadingSpinner";
import { useFetchBlogs } from "@/Utils/useFetchBlogs";

export default function BlogPageClient({ id }: { id: string }) {
    const isLoading = useSelector((state: RootState) => state.ai.isLoading);
    const allBlogs = useFetchBlogs()
    const blog = allBlogs.find(b => b.id === id);

    if (isLoading) return <LandingSpinner fullScreen />;
    if (!blog) return <div className="p-10 text-red-500">Blog not found</div>;

    return <BlogClient blog={blog} />;
}