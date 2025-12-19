// app/signup/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp, googleLogin } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
        }

        if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
        }

        setLoading(true);

        try {
        await signUp({ name, email, password });
        router.push('/dashboard');
        } catch (err: any) {
        setError(err.message || 'Sign up failed');
        } finally {
        setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
        setLoading(true);
        await googleLogin(credentialResponse.credential);
        router.push('/dashboard');
        } catch (err: any) {
        setError(err.message || 'Google sign up failed');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
            </h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
                <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
                </div>
            )}

            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                <label htmlFor="name" className="sr-only">
                    Full Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                />
                </div>
                <div>
                <label htmlFor="email" className="sr-only">
                    Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                />
                </div>
                <div>
                <label htmlFor="password" className="sr-only">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                />
                </div>
                <div>
                <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                </label>
                <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                />
                </div>
            </div>

            <div>
                <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                {loading ? 'Creating account...' : 'Sign up'}
                </button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="flex justify-center">
                <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google sign up failed')}
                />
            </div>

            <div className="text-center">
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Already have an account? Sign in
                </Link>
            </div>
            </form>
        </div>
        </div>
    );
}