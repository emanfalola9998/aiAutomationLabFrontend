"use client";

import Image from 'next/image';
import aiDefaultImage from '../../assets/images/What-is-AI-how-does-it-work.png';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setCommentView} from '@/store/features/counterSlice';
import thumbsUp from '../../assets/images/thumbs-up (1).png';
import { Textarea } from "@/components/ui/textarea"
import AppDropdown from '@/customComponents/appDropdown';
import userImage from '@/app/assets/images/user.png'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { postCommentForBlog } from '@/Utils/postComment';
import { AppDispatch } from '@/store/store';
import { rateCommentForBlog } from '@/Utils/rateCommentForBlog';
import TrendingTopics from '@/Utils/trendingTopics';
import { useFetchComments } from '@/Utils/useFetchComments';
import comment from "../../assets/images/comment.png"
import heart from "../../assets/images/heart.png"
import { likeBlog } from '@/Utils/likeBlog';
import { useAuth } from '@/context/AuthContext';
import { AuthService } from '@/lib/auth';
import toast from 'react-hot-toast';
import router from 'next/router';



type Blog = {
    id: string;
    title: string;
    content: string;
    image: string;
    likes: number; 

};

export default function BlogClient({ blog }: { blog: Blog }) {
    const { isAuthenticated, user } = useAuth();



    const [isLiking, setIsLiking] = useState(false);
    const [isLikingComment, setIsLikingComment] = useState(false);

    const [newCommentText, setNewCommentText] = useState('');
    const [newCommentUser, setNewCommentUser] = useState('Anonymous');
    const [newCommentRating, setNewCommentRating] = useState(0);
    const dispatchUseEffect = useDispatch<AppDispatch>()

    // const viewMode = useSelector((state: RootState) => state.ai.viewMode[blog.id] || "comments");
    // const viewComments = viewMode === "comments";
    // const viewCreateComment = viewMode === "create";

    const sortMode = useSelector((state: RootState) => state.ai.sortComment);
    const dispatch = useDispatch();


    const formattedComment = newCommentText.trim().charAt(0).toUpperCase() + newCommentText.trim().slice(1);

    const allComments = useFetchComments(blog.id) 


    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText) return;

        await dispatchUseEffect(postCommentForBlog(blog.id, {
            blogId: blog.id,
            username: newCommentUser,
            comment: formattedComment,
            rating: newCommentRating,
        }));

        setNewCommentText('');
        setNewCommentRating(0);
        dispatch(setCommentView({ id: blog.id, mode: "comments" }));
    };



    const handleRatings = (commentId: number) => {
        dispatchUseEffect(rateCommentForBlog(blog.id, commentId));
    };


    // Get current like count from Redux (in case it was updated)
    const currentBlog = useSelector((state: RootState) => 
        state.ai.allBlogs.find(b => b.id === blog.id)
    );
    const likeCount = currentBlog?.likes ?? blog.likes;


    const sortedComments = [...allComments].sort((a, b) => {
        if (sortMode === "rating") return b.rating - a.rating;
        if (sortMode === "latest") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });

    // const animationKey = `${viewComments}-${viewCreateComment}`;

    const handleLike = async () => {
        if (!isAuthenticated) {
            toast.error('Please login to like blogs', {
                duration: 4000,
            });
            // Optionally redirect to login
            setTimeout(() => {
                router.push('/login');
            }, 1500);
            return;
        }

        try {
            setIsLiking(true);
            dispatchUseEffect(likeBlog(blog.id));
        } catch (error: any) {
            if (error.message === 'Not authenticated') {
                toast.error('Session expired. Redirecting to login...');
                setTimeout(() => {
                    router.push('/login');
                }, 1500);
            }
        }
        finally{
            setIsLiking(false);
        }
    };

    const handleCommentLike = async (commentId: number) => {
        if (isLikingComment) return // Prevent double-clickling

        setIsLikingComment(true)
        try {
            await dispatchUseEffect(rateCommentForBlog(blog.id, commentId))
        } catch (error) {
            console.error("Failed to like blog comment")
        }
        finally {
            setIsLikingComment(false)
        }
    }



    return (
        <>
            <div className="p-10 max-w-full mx-auto flex flex-col lg:flex-row justify-center items-start gap-50 ">
            <div className='lg:w-1/2 '>
                <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
                <div className='relative w-full max-w-xl h-64  mb-6'>
                    <Image
                        src={blog.image || aiDefaultImage}
                        alt={blog.title}
                        className="rounded-lg mb-6 w-full h-auto"
                        fill
                    />
                </div>    
                
                <p className="text-lg leading-relaxed mt-4">{blog.content}</p>

                <div className=" flex flex-row gap-5 justify-start mt-2 ">
                    {/* <div className='flex flex-row gap-1'><Image className='w-5 h-auto' src={comment} alt="comment icon"/>{allComments.length || 0}</div> */}
                    {isAuthenticated ? (
                        <button 
                            onClick={handleLike} 
                            className="flex items-center gap-1 hover:text-red-500 transition"
                        >
                            <Image src={heart} alt="heart icon" className='w-5 h-auto'/>
                            <span className='text-s'>{likeCount}</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                            <Image src={heart} alt="heart icon" className='w-5 h-auto'/>
                            <span className='text-xs'>{likeCount}</span>
                        </div>
                    )}
                </div>

                <div className=" flex flex-col gap-2 md:flex-row md:gap-0 justify-start mt-4">
                    <hr />
                    {/* <Button 
                        onClick={() => {
                            dispatch(setCommentView({ id: blog.id, mode: "create" }));
                        }}
                    variant="custom" className=' cursor-pointer mr-4 w-40 font-bold my-2' >
                        {viewCreateComment ? "Close Comment" : "Create Comment"}
                    </Button> */}
                    

{/* 
                    <AnimatePresence key={animationKey}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button 
                                onClick={() => {
                                    dispatch(setCommentView({ id: blog.id, mode: "comments" }));
                                }}
                                    variant="custom" className="cursor-pointer mr-4 w-40 font-bold my-2">
                                {viewComments ? "Hide Comments" : "View Comments"}
                            </Button>
                            {viewComments && <AppDropdown  />}
                        </motion.div>
                    </AnimatePresence> */}
                    
                </div>

                {/* Create comment */}
                <div className="p-10 animate-fadeInList lg:w-1/2 flex flex-row justify-between items-center border-b shadow-sm border-gray-300/40 md:p-5 md:my-8">
                        <form onSubmit={handleSubmitComment} className='flex flex-col gap-4 w-full'>
                            <div className='flex flex-row gap-2'><Image src={userImage} alt="user" className='w-7'/>{user?.name}</div>
                            <input
                                className='bg-gray-300 text-black rounded-lg p-4 w-full'
                                placeholder='What are your thoughts on this post?'
                                value={newCommentText}
                                onChange={(e) => setNewCommentText(e.target.value)}
                            />
                            <div className='flex justify-end'>
                                <Button type="submit" variant="custom" className='cursor-pointer w-28 font-bold' disabled={!newCommentText.trim()}>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                    
                {/* comment section */}
                {sortedComments.length > 0 && <div className='mt-10 text-2xl '><h1>Responses</h1></div>}
                <div  >
                    {sortedComments.map(comment => 
                        <div className=' text-black flex flex-col gap-6 rounded-xl border p-6 shadow-sm lg:w-1/2 mt-4' key={comment.id}> 
                            <div className='flex flex-row'><Image src={userImage} alt="user" className='w-7'/><span className='text-gray-400 ml-2'>{new Date(comment.timestamp).toLocaleString()}</span></div>
                            <div>{comment.comment}</div>
                            
                            <div className='flex flex-row gap-1'>
                                <button onClick={() => handleCommentLike(comment.id)}>
                                <Image src={heart} alt="heart icon" className='w-5 cursor-pointer  h-auto'/>
                                {/* <span className='text-xs'>{likeCount}</span> */}
                                </button>
                                <div>{comment.rating || 0}</div>
                            </div> 
                        </div>
                    )}

                </div>
                    
                
            </div>
                    
            <div className='flex flex- gap-4 mt-8  ' >
                <TrendingTopics />
                
            </div>
        </div>


        </>
            );
}
