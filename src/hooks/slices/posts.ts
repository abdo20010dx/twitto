"use client"

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PostsState {
  ids: number[]
  data: any[]
}

const initialState: PostsState = {
  ids: [],
  data: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes


      for (const post of action.payload) {
        if (!state.ids.includes(post.id)) {
          state.data.push(post)
          state.ids.push(post.id)
        }


      }
    },
    cleanPosts: (state, action) => {

      state.data = []
      state.ids = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addPosts, cleanPosts } = postsSlice.actions

export default postsSlice.reducer