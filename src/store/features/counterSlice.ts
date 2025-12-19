import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import commentsData from '../../app/data/comments.json'
import { v4 as uuidv4 } from 'uuid';
import { Blog, Comments, CreateComment } from '../../../types';


type SortMode = "rating" | "latest" | "oldest";



export interface AiState {
    showNav: boolean
    isAutomation: boolean
    isImpactful: boolean
    isFuture: boolean
    searchTerm: string
    currentPage: number
    viewComments: { [blogId: string]: boolean };
    allComments: Comments[]
    createComment: CreateComment
    toggleCreateComment: { [blogId: string]: boolean };
    sortComment: SortMode,
    searchActive: boolean,
    allBlogs: Blog[];          // all blogs from backend
    filteredBlogs: Blog[];     // filtered or searched blogs
    commentsByBlog: { [blogId: string]: Comments[] }; // comments per blog
    isLoading: boolean
}

const initialState: AiState = {
    showNav: false,
    isAutomation: false,
    isImpactful: false,
    isFuture: false,
    searchTerm: '',
    currentPage: 1,
    viewComments: {},
    allComments: [],
    createComment: {},
    toggleCreateComment: {},
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
    isLoading: true
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

        setCurrentPage: (state, action:PayloadAction<number>) => {
            state.currentPage = action.payload
        },

        // Toggle view comments for a blog
        toggleViewComments: (state, action: PayloadAction<string>) => {
            state.viewComments[action.payload] = !state.viewComments[action.payload];
        },

        // Increment comment rating
        incrementCommentRating: (state, action: PayloadAction<{ blogId: string; commentId: number }>) => {
            const { blogId, commentId } = action.payload;
            const comment = state.commentsByBlog[blogId]?.find(c => c.id === commentId);
            if (comment) comment.rating = (comment.rating || 0) + 1;
        },
        
        // Toggle create comment form for a blog
        toggleCreateComment: (state, action: PayloadAction<string>) => {
            state.toggleCreateComment[action.payload] = !state.toggleCreateComment[action.payload];
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
        },


        // Add a single comment
        addCommentForBlog: (state, action: PayloadAction<Comments>) => {
            const blogId = action.payload.blogId;
            if (!state.commentsByBlog[blogId]) {
                state.commentsByBlog[blogId] = [];
            }
            state.commentsByBlog[blogId].push(action.payload);
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

        updateCommentRatingOptimistic: (
            state,
            action: PayloadAction<{ blogId: string; commentId: number; newRating: number }>
        ) => {
            const { blogId, commentId, newRating } = action.payload;
            const blogComments = state.commentsByBlog[blogId];

            if (!blogComments) return;

            const comment = blogComments.find(c => c.id === commentId);
            if (comment) {
                comment.rating = newRating;
            }
        },

        setCreateComment: (
            state, action: PayloadAction<{ blogId: string; value: string }>) => {
            const { blogId, value } = action.payload;

            if (!state.createComment[blogId]) {
                state.createComment[blogId] = { comment: "" };
            }

            state.createComment[blogId].comment = value;
        },


        setAllBlogs: (state, action: PayloadAction<Blog[]>) => {
            state.allBlogs = action.payload;
            state.filteredBlogs = action.payload; // optionally reset filtered view
        },

        setAllComments: (state, action: PayloadAction<Comments[]>) => {
            state.allComments = action.payload
        },

        setIsLoading:(state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    }
})

export const {
    setShowNav,
    setIsAutomation,
    setIsImpactful,
    setIsFuture,
    setSearchTerm,
    setCurrentPage,
    toggleViewComments,
    incrementCommentRating,
    toggleCreateComment,
    setSortComment,
    setFilteredBlogs, 
    toggleAutomation,
    toggleFuture,
    toggleImpactful,
    setSearchActive,
    setAllBlogs,
    deleteCommentFromBlog,
    setCommentsForBlog,
    addCommentForBlog,
    updateCommentRatingOptimistic,
    setAllComments,
    setCreateComment,
    setIsLoading
} = aiSlice.actions

export default aiSlice.reducer