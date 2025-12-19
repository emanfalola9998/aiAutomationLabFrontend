import { ProtectedRoute } from '@/components/ProtectedRoute'
import React from 'react'

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <h1 className='m-20 text-4xl'>Notifications</h1>
        {/* {mapped notifications of user's data} */}
      </ProtectedRoute>
    </div>
  )
}

export default page
