'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import CreateBlogForm from '@/components/CreateBlogForm';

export default function CreateBlogPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 py-8">
                <CreateBlogForm />
            </div>
        </ProtectedRoute>
    );
}

            {/* <div className="flex flex-col max-w-3xl mx-auto mt-20 px-4">

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    className="w-full text-5xl font-semibold bg-transparent focus:outline-none placeholder-gray-400 mb-6"
                />

                <textarea
                    placeholder="Tell your story…"
                    value={content}
                    onChange={(e) => dispatch(setContent(e.target.value))}
                    className="w-full bg-transparent focus:outline-none placeholder-gray-400 text-xl leading-relaxed resize-none min-h-[300px]"
                />

                <Button onClick={createBlog} className='w-20 bg-green-600'>Publish</Button>
            </div> */}

