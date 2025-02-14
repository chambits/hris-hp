import { useTheme } from '@mui/material';
import { useAppTheme } from '../../../app/themeSlice';
import { Theme } from 'ag-grid-community';

export const useAgGridTheme = (themeQuartz: Theme) => {
  const { mode } = useAppTheme();
  const theme = useTheme();

  const themeDark = themeQuartz.withParams({
    backgroundColor: theme.palette.background.default,
    foregroundColor: theme.palette.text.primary,
    headerTextColor: theme.palette.text.primary,
    headerBackgroundColor: theme.palette.background.paper,
    oddRowBackgroundColor: theme.palette.background.paper,
    headerColumnResizeHandleColor: theme.palette.text.primary,
  });

  const lightTheme = themeQuartz.withParams({
    backgroundColor: theme.palette.background.default,
    foregroundColor: theme.palette.text.primary,
    headerTextColor: theme.palette.text.primary,
    headerBackgroundColor: theme.palette.background.paper,
    oddRowBackgroundColor: theme.palette.background.paper,
    headerColumnResizeHandleColor: theme.palette.text.primary,
  });

  return mode === 'Dark' ? themeDark : lightTheme;
};
