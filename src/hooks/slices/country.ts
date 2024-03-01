"use client"

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CountryState {
  country: string
}

const initialState: CountryState = {
  country: ''
}

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountry: (state, action: PayloadAction<any>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      state.country = action.payload

    },

  },
})

// Action creators are generated for each case reducer function
export const { setCountry } = countrySlice.actions

export default countrySlice.reducer