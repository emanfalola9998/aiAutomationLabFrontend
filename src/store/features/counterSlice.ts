import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import commentsData from '../../app/data/comments.json'
import { v4 as uuidv4 } from 'uuid';
import { Blog, Comments, CreateComment } from '../../../types';


type SortMode = "rating" | "latest" | "oldest";

type CommentViewState = "comments" | "none" | "create";



export interface AiState {
    showNav: boolean
    isAutomation: boolean
    isImpactful: boolean
    isFuture: boolean
    searchTerm: string
    currentPage: number
    createComment: CreateComment
    sortComment: SortMode,
    searchActive: boolean,
    allBlogs: Blog[];          // all blogs from backend
    filteredBlogs: Blog[];     // filtered or searched blogs
    commentsByBlog: { [blogId: string]: Comments[] }; // comments per blog
    isLoading: boolean;
    title: string;
    content: string;
    viewMode: { [blogId: string]: CommentViewState };

}

const initialState: AiState = {
    showNav: false,
    isAutomation: false,
    isImpactful: false,
    isFuture: false,
    searchTerm: '',
    currentPage: 1,
    createComment: {},
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
        },


        // Add a single comment
        addCommentForBlog: (state, action: PayloadAction<Comments>) => {
            const blogId = action.payload.blogId;
            if (!state.commentsByBlog[blogId]) {
                state.commentsByBlog[blogId] = [];
            }
            state.commentsByBlog[blogId].push(action.payload);
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
            
            // Update in filteredBlogs
            const filteredIndex = state.filteredBlogs.findIndex(blog => blog.id === blogId);
            if (filteredIndex !== -1) {
                state.filteredBlogs[filteredIndex].likes = likes;
            }
        },

    }
})

export const {
    setShowNav,
    setIsAutomation,
    setIsImpactful,
    setIsFuture,
    setSearchTerm,
    setCurrentPage,
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
    addCommentForBlog,
    updateCommentRatingOptimistic,
    setCreateComment,
    setIsLoading,
    setContent,
    setTitle,
    addBlog,
    setCommentView,
    updateBlogLikes
} = aiSlice.actions

export default aiSlice.reducer