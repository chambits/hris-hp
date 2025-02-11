import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  getErrorMessage = (error: Error | undefined): string => {
    if (!error) return 'An unexpected error occurred';

    if (error.message.includes('Failed to fetch')) {
      return 'Unable to connect to the server. Please check your internet connection.';
    }
    if (error.message.includes('Network error')) {
      return 'Network connection issue. Please try again later.';
    }
    if (error.message.includes('Timeout')) {
      return 'The request took too long to complete. Please try again.';
    }

    return 'We encountered an unexpected issue. Our team has been notified.';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          bgcolor="background.default"
          p={3}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 500,
              width: '100%',
              textAlign: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <ErrorIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h5" gutterBottom color="text.primary">
              Oops! Something's not quite right
            </Typography>
            <Typography color="text.secondary" paragraph>
              {this.getErrorMessage(this.state.error)}
            </Typography>
            <Box
              sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleReset}
                sx={{ minWidth: 120 }}
              >
                Go to Home
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
                sx={{ minWidth: 120 }}
              >
                Try Again
              </Button>
            </Box>
            {process.env.NODE_ENV === 'development' && (
              <Typography
                variant="caption"
                component="div"
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  color: 'text.secondary',
                  textAlign: 'left',
                  fontFamily: 'monospace',
                }}
              >
                {this.state.error?.stack}
              </Typography>
            )}
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
