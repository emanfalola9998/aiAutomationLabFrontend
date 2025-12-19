import { AppDispatch } from '@/store/store';
import { addCommentForBlog } from '@/store/features/counterSlice';
import { Comments } from '../../types';

export const postCommentForBlog = (blogId: string, comment: Omit<Comments, 'id' | 'timestamp'>) => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch(`/blogs/${blogId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment),
        });
        const savedComment: Comments = await res.json();
        dispatch(addCommentForBlog(savedComment));
    } catch (err) {
        console.error('Error adding comment:', err);
    }
};
