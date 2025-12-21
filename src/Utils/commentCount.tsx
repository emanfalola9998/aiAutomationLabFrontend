// components/CommentCount.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchCommentsForBlog } from '@/Utils/fetchCommentsForBlog';
import Image from 'next/image';
import comment from '../app/assets/images/comment.png'; // adjust path

export function CommentCount({ blogId }: { blogId: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const comments = useSelector((state: RootState) => 
        state.ai.commentsByBlog[blogId] || []
    );

    useEffect(() => {
        if (comments.length === 0) {
        dispatch(fetchCommentsForBlog(blogId));
        }
    }, [blogId, dispatch]);

    return (
        <div className='flex flex-row gap-1'>
        <Image src={comment} alt="comment icon" className='w-4 h-4'/>
        <span className='text-xs'>{comments.length}</span>
        </div>
    );
}