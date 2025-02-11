import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '.';

export type ThemeMode = 'Light' | 'Dark' | 'System';

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: 'Light',
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
    setTheme: (value: ThemeMode) => dispatch(setTheme(value)),
  };
};
