import { createSlice } from '@reduxjs/toolkit';

type AppState = {
    mode: string;
  }
  

const initialState: AppState = {
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mode', state.mode);
    },
  },
});

export const { switchMode } = themeSlice.actions;
export default themeSlice.reducer;
