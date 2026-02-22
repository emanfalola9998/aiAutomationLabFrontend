import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import commentsData from '../../app/data/comments.json'
import { v4 as uuidv4 } from 'uuid';
import { Blog, Comments, CreateComment, Notification } from '../../../types';


type SortMode = "rating" | "latest" | "oldest";

type CommentViewState = "comments" | "none" | "create";



export interface AiState {
    showNav: boolean
    isAutomation: boolean
    isImpactful: boolean
    isFuture: boolean
    searchTerm: string
    currentPage: number
    sortComment: SortMode,
    searchActive: boolean,
    allBlogs: Blog[];          // all blogs from backend
    filteredBlogs: Blog[];     // filtered or searched blogs
    commentsByBlog: { [blogId: string]: Comments[] }; // comments per blog
    isLoading: boolean;
    title: string;
    content: string;
    viewMode: { [blogId: string]: CommentViewState };
    notifications: Notification[];
    unreadCount: number;

}

const initialState: AiState = {
    showNav: false,
    isAutomation: false,
    isImpactful: false,
    isFuture: false,
    searchTerm: '',
    currentPage: 1,
    sortComment: "rating",
    filteredBlogs: [{
        id: '',
        title: '',
        content: '',
        image: '',
        tags: '',
        author: '',
        datePublished: '',
        likes: 0
    }],
    searchActive: false,
    commentsByBlog: {},
    allBlogs: [],
    isLoading: true,
    title: "",
    content: "",
    viewMode: {},
    notifications: [],
    unreadCount: 0,

}

const aiSlice =  createSlice({
    name: 'ai',
    initialState,
    reducers: {
        setShowNav: (state, action: PayloadAction<boolean>) => {
            state.showNav = action.payload;
        },

        setIsAutomation: (state, action:PayloadAction<boolean>) => {
            state.isAutomation = action.payload
        },

        setIsImpactful: (state, action:PayloadAction<boolean>) => {
            state.isImpactful = action.payload
        },

        setIsFuture: (state, action:PayloadAction<boolean>) => {
            state.isFuture = action.payload
        },

        setSearchTerm: (state, action:PayloadAction<string>) => {
            state.searchTerm = action.payload.toLowerCase(); // doing it here instead of within the code
        },

        // Increment comment rating
        incrementCommentRating: (state, action: PayloadAction<{ blogId: string; commentId: number }>) => {
            const { blogId, commentId } = action.payload;
            const comment = state.commentsByBlog[blogId]?.find(c => c.id === commentId);
            if (comment) comment.rating = (comment.rating || 0) + 1;
        },

        setCommentView: (state, action: PayloadAction<{ id: string; mode: "comments" | "create" }>) => {
            const { id, mode } = action.payload;
            state.viewMode[id] = state.viewMode[id] === mode ? "none" : mode;
        },

        setSortComment: (state, action: PayloadAction<SortMode>) => {
            state.sortComment = action.payload
        },

        setFilteredBlogs: (state, action: PayloadAction<Blog[]>) => {
            state.filteredBlogs = action.payload;
        },

        toggleImpactful(state, action: PayloadAction<boolean>) {
            state.isImpactful = action.payload;
        },

        toggleFuture(state, action: PayloadAction<boolean>) {
            state.isFuture = action.payload;
        },

        toggleAutomation(state, action: PayloadAction<boolean>) {
            state.isAutomation = action.payload;
        },
        
        setSearchActive(state, action: PayloadAction<boolean>){
            state.searchActive = action.payload
        },

        setCommentsForBlog: (state, action: PayloadAction<{ blogId: string, comments: Comments[] }>) => {
            state.commentsByBlog[action.payload.blogId] = action.payload.comments;
            // its fine that its equal (replaces old comments with new comments) because we are fetching all comments after every create, update, delete, so we are always replacing old with new
        },

        addBlog: (state, action: PayloadAction<Blog>) => {
            // Simply add the new blog to the beginning of the array
            state.allBlogs.unshift(action.payload);
            state.filteredBlogs.unshift(action.payload);
        },

        updateCommentInBlog(state, action) {
            const updated = action.payload;
            const arr = state.commentsByBlog[updated.blogId] || [];
            const idx = arr.findIndex(c => c.id === updated.id);
            if (idx !== -1) arr[idx] = updated;
        },

        // delete a comment
        deleteCommentFromBlog: (state, action: PayloadAction<{ blogId: string, commentId: number }>) => {
            const { blogId, commentId } = action.payload;
            if (state.commentsByBlog[blogId]) {
                state.commentsByBlog[blogId] = state.commentsByBlog[blogId].filter(c => c.id !== commentId);
            }        
        },

        setAllBlogs: (state, action: PayloadAction<Blog[]>) => {
            state.allBlogs = action.payload;
            state.filteredBlogs = action.payload; // optionally reset filtered view
        },


        setIsLoading:(state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },

        setTitle:(state, action: PayloadAction<string>) => {
            state.title = action.payload
        },

        setContent:(state, action: PayloadAction<string>) => {
            state.content = action.payload
        },

        updateBlogLikes: (state, action: PayloadAction<{ blogId: string; likes: number }>) => {
            const { blogId, likes } = action.payload; // getting blog's id and likes from the client
            
            // Update in allBlogs
            const blogIndex = state.allBlogs.findIndex(blog => blog.id === blogId); // finding the specific blog we are looking for
            if (blogIndex !== -1) { 
                state.allBlogs[blogIndex].likes = likes; // If we find the index, index allblogs and update the blog we want likes
            }
        },

        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
            state.unreadCount = action.payload.filter(n => !n.isRead).length;
        },

        markNotificationAsRead: (state, action: PayloadAction<number>) => {
            const notif = state.notifications.find(n => n.id === action.payload);
            if (notif) {
                notif.isRead = true;
                state.unreadCount = state.notifications.filter(n => !n.isRead).length;
            }
        },

        markAllNotificationsAsRead: (state) => {
            state.notifications.forEach(n => { n.isRead = true; });
            state.unreadCount = 0;
        },

    }
})

export const {
    setShowNav,
    setIsAutomation,
    setIsImpactful,
    setIsFuture,
    setSearchTerm,
    incrementCommentRating,
    setSortComment,
    setFilteredBlogs, 
    toggleAutomation,
    toggleFuture,
    toggleImpactful,
    setSearchActive,
    setAllBlogs,
    deleteCommentFromBlog,
    setCommentsForBlog,
    setIsLoading,
    setContent,
    setTitle,
    addBlog,
    setCommentView,
    updateBlogLikes,
    setNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} = aiSlice.actions

export default aiSlice.reducer