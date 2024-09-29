'use client';

import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type Language = 'id' | 'en';
type InitialState = {
  language: Language;
};

const initialState: InitialState = {
  language: 'id',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, actions: PayloadAction<Language>) => {
      state.language = actions.payload;
    },
  },
});

export const languageReducer = languageSlice.reducer;
export const {setLanguage} = languageSlice.actions;
