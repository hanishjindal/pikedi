import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer, // Make sure to include your authSlice reducer
        // Other reducers if you have them
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch