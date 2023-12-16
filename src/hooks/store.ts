import { configureStore } from '@reduxjs/toolkit'
import reducerOfCounter from './slices/counter'
import reducerOfPosts from './slices/posts'
export const store = configureStore({
    reducer: {
        counter: reducerOfCounter,
        posts: reducerOfPosts
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch