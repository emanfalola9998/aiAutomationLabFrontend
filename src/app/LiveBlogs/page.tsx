import React from 'react'
import MainBlog from '../MainBlog/MainBlog'
import { ProtectedRoute } from '@/components/ProtectedRoute'

const LiveBlogs = () => {


  return (
    <div>
        <ProtectedRoute>
          <MainBlog  />
        </ProtectedRoute>
    </div>
  )
}

export default LiveBlogs
