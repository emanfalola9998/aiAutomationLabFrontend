import { AppDispatch } from '@/store/store';
import { setAllBlogs } from '@/store/features/counterSlice';


export const fetchBlogs = () => async (dispatch: AppDispatch) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blogs`);
        const data = await res.json();

        dispatch(setAllBlogs(data));
        
    } catch (err) {
        console.error(err, "blogs not rendering");
    }
};
