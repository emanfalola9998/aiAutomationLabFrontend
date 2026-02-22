// app/blogs/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { createBlog } from '../Utils/postBlog';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';


export default function CreateBlogPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
    const [tags, setTags] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const { user } = useAuth(); 

    
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const formattedTitle = title.trim().charAt(0).toUpperCase() + title.trim().slice(1);
    const formattedContent = content.trim().charAt(0).toUpperCase() + content.trim().slice(1)

    const handlePublish = async () => {
        setError('');
        
        if (!formattedTitle || !content.trim()) {
            setError('Title and content are required');
        return;
        }

        setLoading(true);
        console.log('Submitting blog with user:', user);

        try {
        await dispatch(createBlog({
            title: formattedTitle,
            content: formattedContent,
            image: image.trim(),
            tags: tags || 'General',
            authorName: user?.name
        }));
        
        // Reset form and redirect
        router.push('/LiveBlogs');
        } catch (err: any) {
        setError(err.message || 'Failed to create blog');
        } finally {
        setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
        <div className="min-h-screen bg-white">
            <div className="flex flex-col max-w-3xl mx-auto mt-20 px-4">
            
            {/* Error Message */}
            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                {error}
                </div>
            )}

            {/* Title Input */}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-5xl font-semibold bg-transparent focus:outline-none placeholder-gray-400 mb-6"
            />

            {/* Tag Dropdown */}
            <div className="mb-6">
                <select
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                <option value="">General</option>
                <option value="Impactful">Impactful</option>
                <option value="Automation">Automation</option>
                <option value="Future">Future</option>
                </select>
            </div>

            {/* Image Input (URL or Upload) */}
            <div className="mb-6">
                <div className="flex gap-4 mb-3 text-sm">
                    <button
                        type="button"
                        onClick={() => { setImageMode('url'); setImage(''); }}
                        className={`pb-1 border-b-2 ${imageMode === 'url' ? 'border-black font-semibold' : 'border-transparent text-gray-400'}`}
                    >
                        Image URL
                    </button>
                    <button
                        type="button"
                        onClick={() => { setImageMode('upload'); setImage(''); }}
                        className={`pb-1 border-b-2 ${imageMode === 'upload' ? 'border-black font-semibold' : 'border-transparent text-gray-400'}`}
                    >
                        Upload from computer
                    </button>
                </div>

                {imageMode === 'url' ? (
                    <input
                        type="url"
                        placeholder="Image URL (optional)"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full text-lg bg-transparent focus:outline-none placeholder-gray-400 pb-2 border-b border-gray-200"
                    />
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                )}

                {image && (
                    <img src={image} alt="preview" className="mt-3 h-40 object-cover rounded-lg" />
                )}
            </div>

            {/* Content Textarea */}
            <textarea
                placeholder="Tell your story…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-transparent focus:outline-none placeholder-gray-400 text-xl leading-relaxed resize-none min-h-[300px]"
            />

            {/* Publish Button */}
            <button
                onClick={handlePublish}
                disabled={loading}
                className="w-20 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium mt-6"
            >
                {loading ? '...' : 'Publish'}
            </button>
            </div>
        </div>
        </ProtectedRoute>
    );
}