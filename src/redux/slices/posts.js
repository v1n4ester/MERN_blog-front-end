import { SatelliteAlt } from '@mui/icons-material';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../axios'


export const fetchPosts = createAsyncThunk('posts/fetchPosts', // назва action
 async() =>{
    const {data} = await axios.get('/posts');
    return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', // назва action
 async() =>{
    const {data} = await axios.get('/posts/tags');
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', // назва action
 async(id) =>{
    await axios.delete(`/posts/${id}`);
})

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {}, // методи які будуть обновляти state
    extraReducers: { // стан асинхронного action
        // Отримання статтей
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        // Отримання тегів
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        // Видалення мтаттей
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const postsReducer = postsSlice.reducer