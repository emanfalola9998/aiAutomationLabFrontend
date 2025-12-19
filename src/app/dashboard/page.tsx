// app/dashboard/page.tsx
'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                <div className="flex items-center">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">
                    Welcome, {user?.name}!
                    </span>
                    <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                    Logout
                    </button>
                </div>
                </div>
            </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4">User Information</h2>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Provider:</strong> {user?.provider}</p>
                    <p><strong>User ID:</strong> {user?.id}</p>
                </div>
                </div>
            </div>
            </main>
        </div>
        </ProtectedRoute>
    );
}