import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import commentsData from '../../app/data/comments.json'
import { v4 as uuidv4 } from 'uuid';
import { Blog, Comments } from '../../../types';


type SortMode = "rating" | "latest" | "oldest";



export interface AiState {
    showNav: boolean
    isAutomation: boolean
    isImpactful: boolean
    isFuture: boolean
    searchTerm: string
    currentPage: number
    viewComments: boolean
    rating: number
    comment: Comments[]
    createComment: Comments
    toggleCreateComment: boolean
    sortComment: SortMode,
    filteredBlogs: Blog[],
    
}

const initialState: AiState = {
    showNav: false,
    isAutomation: false,
    isImpactful: false,
    isFuture: false,
    searchTerm: '',
    currentPage: 1,
    viewComments: false,
    rating: 0,
    comment: commentsData,
    createComment: {
        blogId: 'ai',            // current blog ID
        id: parseInt(uuidv4()),  // or use a counter in state
        user: 'John',
        comment: 'Great post!',
        timestamp: new Date().toISOString(),
        rating: 0
    },
    toggleCreateComment: false, 
    sortComment: "rating",
    filteredBlogs: [{
        id: '',
        title: '',
        content: '',
        image: '',
        tags: '',
        author: '',
        datePublished: ''
    }]
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
            state.searchTerm = action.payload
        },

        setCurrentPage: (state, action:PayloadAction<number>) => {
            state.currentPage = action.payload
        },

        setViewComments: (state, action:PayloadAction<boolean>) => {
            state.viewComments = action.payload
        },

        setRating: (state, action: PayloadAction<number>) => {
            state.rating = action.payload; // set to value
        },

        incrementCommentRating: (state, action: PayloadAction<number>) => {
            const comment = state.comment.find(c => c.id === action.payload);
                if (comment) {
                    comment.rating = (comment.rating || 0) + 1;
                }
            },

        // setCreateComment:
        
        setToggleCreateComment: (state, action:PayloadAction<boolean>) => {
            state.toggleCreateComment = action.payload
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
    }
})

export const {
    setShowNav,
    setIsAutomation,
    setIsImpactful,
    setIsFuture,
    setSearchTerm,
    setCurrentPage,
    setViewComments,
    setRating,
    incrementCommentRating,
    setToggleCreateComment,
    setSortComment,
    setFilteredBlogs, 
    toggleAutomation,
    toggleFuture,
    toggleImpactful
} = aiSlice.actions

export default aiSlice.reducer