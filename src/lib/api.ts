// lib/api.ts - Example of making authenticated API calls

import { AuthService } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export class ApiClient {
  // Generic fetch with authentication
    static async fetch<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            ...AuthService.getAuthHeaders(),
            ...options.headers,
        },
        });

        if (!response.ok) {
        if (response.status === 401) {
            // Unauthorized - redirect to login
            AuthService.logout();
            window.location.href = '/login';
        }
        const error = await response.json();
        throw new Error(error.error || 'API request failed');
        }

        return response.json();
    }

    // Example: Fetch blogs with authentication
    static async getBlogs() {
        return this.fetch('/api/blogs', {
        method: 'GET',
        });
    }

    // Example: Create blog with authentication
    static async createBlog(data: any) {
        return this.fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify(data),
        });
    }

    // Example: Update blog with authentication
    static async updateBlog(id: string, data: any) {
        return this.fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        });
    }

    // Example: Delete blog with authentication
    static async deleteBlog(id: string) {
        return this.fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        });
    }
}

// Usage example in a component:
// import { ApiClient } from '@/lib/api';
//
// const blogs = await ApiClient.getBlogs();
// await ApiClient.createBlog({ title: 'New Blog', content: '...' });