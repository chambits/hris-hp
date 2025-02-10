import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '.';

interface ThemeState {
  mode: 'light' | 'dark' | 'system';
}

const initialState: ThemeState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

export const useAppTheme = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return {
    mode,
    setTheme: (value: 'light' | 'dark' | 'system') => dispatch(setTheme(value)),
  };
};
