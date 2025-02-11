import { useTheme } from '@mui/material';
import { useAppTheme } from '../../../store/themeSlice';
import { Theme } from 'ag-grid-community';

export const useQuartzTheme = (themeQuartz: Theme) => {
  const { mode } = useAppTheme();
  const theme = useTheme();

  const themeDark = themeQuartz.withParams({
    backgroundColor: theme.palette.background.paper,
    foregroundColor: theme.palette.text.primary,
    headerTextColor: theme.palette.text.primary,
    headerBackgroundColor: theme.palette.background.default,
    oddRowBackgroundColor: theme.palette.background.default,
    headerColumnResizeHandleColor: theme.palette.text.primary,
  });

  const lightTheme = themeQuartz.withParams({
    backgroundColor: theme.palette.background.default,
    foregroundColor: theme.palette.text.primary,
    headerTextColor: theme.palette.text.primary,
    headerBackgroundColor: theme.palette.background.default,
    oddRowBackgroundColor: theme.palette.background.paper,
    headerColumnResizeHandleColor: theme.palette.text.primary,
  });

  return mode === 'Dark' ? themeDark : lightTheme;
};
