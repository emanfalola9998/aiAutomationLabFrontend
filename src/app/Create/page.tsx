"use client"

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

const Create = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Should only be accessible when you are logged in

    
    return (
        <ProtectedRoute>
            <div className="flex flex-col max-w-3xl mx-auto mt-20 px-4">

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-5xl font-semibold bg-transparent focus:outline-none placeholder-gray-400 mb-6"
                />

                <textarea
                    placeholder="Tell your story…"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent focus:outline-none placeholder-gray-400 text-xl leading-relaxed resize-none min-h-[300px]"
                />

                <Button className='w-20 bg-green-600'>Publish</Button>
            </div>
        </ProtectedRoute>
    )
}

export default Create
