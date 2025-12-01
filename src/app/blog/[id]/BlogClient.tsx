"use client";

import Image from 'next/image';
import aiDefaultImage from '../../assets/images/What-is-AI-how-does-it-work.png';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {setViewComments, incrementCommentRating, setToggleCreateComment } from '@/store/features/counterSlice';
import thumbsUp from '../../assets/images/thumbs-up (1).png';
import { Textarea } from "@/components/ui/textarea"
import AppDropdown from '@/customComponents/appDropdown';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"





type Blog = {
    id: string;
    title: string;
    content: string;
    image: string;
};

export default function BlogClient({ blog }: { blog: Blog }) {

    const allComments =  useSelector((state: RootState) => state.ai.comment)
    const viewComments = useSelector((state: RootState) => state.ai.viewComments);
    const toggleCreateComment = useSelector((state: RootState) => state.ai.toggleCreateComment)
    const sortMode = useSelector((state: RootState) => state.ai.sortComment);


    const comments = allComments.filter(c => c.blogId === blog.id);

    const dispatch = useDispatch();

    const handleViewComments = () => {
        dispatch(setViewComments(!viewComments));
        dispatch(setToggleCreateComment(false))

    };

    const handleRatings = (id: number) => {
        dispatch(incrementCommentRating(id))
    }

    const handleToggleCreateComment = () => {
        dispatch(setToggleCreateComment(!toggleCreateComment))
        dispatch(setViewComments(false))
    }


    const sortedComments = [...comments].sort((a, b) => {
        if (sortMode === "rating") return b.rating - a.rating;
        if (sortMode === "latest") return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });


    return (
        <div className="p-10 max-w-full  mx-auto flex flex-col lg:flex-row lg:justify-evenly  ">
            <div className='lg:w-1/2'>
                <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

                <Image
                    src={blog.image || aiDefaultImage}
                    alt={blog.title}
                    className="rounded-lg mb-6 w-full"
                />

                <p className="text-lg leading-relaxed">{blog.content}</p>

                <div className=" flex flex-col gap-2 md:flex-row md:gap-0 justify-start mt-4">
                    <hr />
                    <Button onClick={handleToggleCreateComment}  variant="black" className='mr-4'>
                        {toggleCreateComment ? "Close Comment" : "Create Comment"}
                    </Button>
                    <Button onClick={handleViewComments} variant="black" className="mr-4">
                    {viewComments ? "Hide Comments" : "View Comments"}
                    </Button>
                    {viewComments && <AppDropdown />}
                </div >
                <div className='flex flex-col gap-2'>
                    {!toggleCreateComment && viewComments && sortedComments.map(comment => 
                        <div className='bg-black text-white flex flex-col gap-6 rounded-xl border p-6 shadow-sm w-full max-w-sm mt-4' key={comment.id}> 
                            <div><span className='bg-orange-500 p-2 rounded-2xl'>{comment.user}</span><span className='text-gray-400 ml-2'>{new Date(comment.timestamp).toLocaleString()}</span></div>
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
                {toggleCreateComment && !viewComments && <Card className="w-full max-w-sm bg-[lab(2.75381%_0_0)] mt-4 text-white">
                    <CardHeader>
                        <CardTitle>Create Comment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                <Label htmlFor="comment">Comment</Label>
                                <Textarea 
                                    id="comment"
                                    placeholder="Type comment here..."
                                    required
                                />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </CardFooter>
                </Card>}
            </div>

            <div className='flex flex-col gap-4 mt-8  ' >
                
                <h1 className='mb-2 text-2xl'> Trending Topics</h1>
                <div className='bg-gray-600 shadow-2xl text-black border-3 border-white p-4'>
                    <h1 className='mb-2 font-bold'> Topic 1</h1>
                    <p>brief description about trending ai article</p>
                </div>
                    <div className='bg-gray-600 shadow-2xl text-black border-3 border-white p-4'>
                    <h1 className='mb-2 font-bold'> Topic 2</h1>
                    <p>brief description about trending ai article</p>
                </div>
                    <div className='bg-gray-600 shadow-2xl  text-black border-3 border-white p-4'>
                    <h1 className='mb-2 font-bold'> Topic 3</h1>
                    <p>brief description about trending ai article</p>
                </div>
                    <div className='bg-gray-600 shadow-2xl text-black border-3 border-white p-4'>
                    <h1 className='mb-2 font-bold'> Topic 4</h1>
                    <p>brief description about trending ai article</p>
                </div>
            </div>
        </div>

    );
}
