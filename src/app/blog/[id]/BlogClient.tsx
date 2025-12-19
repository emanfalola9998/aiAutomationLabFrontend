"use client";

import Image from 'next/image';
import aiDefaultImage from '../../assets/images/What-is-AI-how-does-it-work.png';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {toggleViewComments,
    toggleCreateComment, 
    } from '@/store/features/counterSlice';
import thumbsUp from '../../assets/images/thumbs-up (1).png';
import { Textarea } from "@/components/ui/textarea"
import AppDropdown from '@/customComponents/appDropdown';
import user from '@/app/assets/images/user.png'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { postCommentForBlog } from '@/Utils/fetchCommentsPerBlog';
import { AppDispatch } from '@/store/store';
import { rateCommentForBlog } from '@/Utils/rateCommentForBlog';
import TrendingTopics from '@/Utils/trendingTopics';




type Blog = {
    id: string;
    title: string;
    content: string;
    image: string;
};

export default function BlogClient({ blog }: { blog: Blog }) {



    const [newCommentText, setNewCommentText] = useState('');
    const [newCommentUser, setNewCommentUser] = useState('Anonymous');
    const [newCommentRating, setNewCommentRating] = useState(0);
    const dispatchUseEffect = useDispatch<AppDispatch>()

    
    const viewComments = useSelector(
        (state: RootState) => !!state.ai.viewComments[blog.id]
    );

    const viewCreateComment = useSelector(
        (state: RootState) => !!state.ai.toggleCreateComment[blog.id]
    );

    const sortMode = useSelector((state: RootState) => state.ai.sortComment);
    const dispatch = useDispatch();
    const comments = useSelector((state: RootState) => state.ai.commentsByBlog[blog.id] || []);


    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText) return;

        await dispatchUseEffect(postCommentForBlog(blog.id, {
            blogId: blog.id,
            user: newCommentUser,
            comment: newCommentText,
            rating: newCommentRating,
        }));

        setNewCommentText('');
        setNewCommentRating(0);
        dispatch(toggleCreateComment(blog.id)); // close form
        dispatch(toggleViewComments(blog.id));   // open comments
    };



    const handleRatings = (commentId: number) => {
        dispatchUseEffect(rateCommentForBlog(blog.id, commentId));
    };




    const sortedComments = [...comments].sort((a, b) => {
        if (sortMode === "rating") return b.rating - a.rating;
        if (sortMode === "latest") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });

    const animationKey = `${viewComments}-${viewCreateComment}`;


    return (
        <>
            <div className="p-10 max-w-full  mx-auto flex flex-col lg:flex-row lg:justify-evenly   ">
            <div className='lg:w-1/2 max-w-xl'>
                <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
                <div className='relative w-full max-w-xl h-64 '>
                    <Image
                    src={blog.image || aiDefaultImage}
                    alt={blog.title}
                    className="rounded-lg mb-6 w-full h-auto"
                    fill
                />

                </div>    
                
                <p className="text-lg leading-relaxed mt-4">{blog.content}</p>

                <div className=" flex flex-col gap-2 md:flex-row md:gap-0 justify-start mt-4">
                    <hr />
                    <Button onClick={() => dispatch(toggleCreateComment(blog.id))}  variant="custom" className=' cursor-pointer mr-4 w-40 font-bold my-2' >
                        {viewCreateComment ? "Close Comment" : "Create Comment"}
                    </Button>

                    <AnimatePresence key={animationKey}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button onClick={() => dispatch(toggleViewComments(blog.id))} variant="custom" className="cursor-pointer mr-4 w-40 font-bold my-2">
                                {viewComments ? "Hide Comments" : "View Comments"}
                            </Button>
                            {viewComments && <AppDropdown  />}
                        </motion.div>
                    </AnimatePresence>
                    
                </div >
                <div className={`flex flex-col gap-2 transition-all duration-500 ease-out
                    ${viewComments ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} >
                    {!toggleCreateComment && viewComments && sortedComments.map(comment => 
                        <div className='bg-[#FAF3E1] text-black flex flex-col gap-6 rounded-xl border p-6 shadow-sm w-full max-w-sm mt-4' key={comment.id}> 
                            <div className='flex flex-row'><Image src={user} alt="user" className='w-7'/><span className='text-gray-400 ml-2'>{new Date(comment.timestamp).toLocaleString()}</span></div>
                            <div>{comment.comment}</div>
                            
                            <div className='flex flex-row'>
                                <button onClick={() => handleRatings(comment.id)}>
                                    <Image
                                    className='w-15 h-10 cursor-pointer'
                                    src={thumbsUp} // should trigger a post request when rating is changed
                                    alt="Thumbs Up"
                                    />    
                                </button>
                                <div>{comment.rating || 0}</div>
                            </div> 
                        </div>
                    )}

                </div>
                <div className={`
                    transition-all duration-500 ease-out
                    ${viewCreateComment && !viewComments 
                    ? "opacity-100 translate-y-0 max-h-[800px]" 
                    : "opacity-0 translate-y-4 max-h-0 overflow-hidden"
                    }
                `}>
                    {viewCreateComment && !viewComments && (
                        <Card className="w-full max-w-sm bg-[#FAF3E1] mt-4 text-black">
                            <CardHeader>
                                <CardTitle>Create Comment</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={handleSubmitComment}>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="comment">Comment</Label>
                                            <Textarea
                                                id="comment"
                                                placeholder="Type comment here..."
                                                value={newCommentText}
                                                onChange={(e) => setNewCommentText(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>

                            <CardFooter className="flex-col gap-2">
                                <Button
                                    variant="custom"
                                    type="submit"
                                    className="border-2 border-black hover:black"
                                >
                                    Submit
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
                
            </div>

            <div className='flex flex-col gap-4 mt-8  ' >
                <TrendingTopics />
                
            </div>
        </div>


        </>
            );
}
