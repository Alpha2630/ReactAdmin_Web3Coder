// app/theme.ts
'use client';

import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c3aed',
    },
    secondary: {
      main: '#2563eb',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(30, 41, 59, 0.6)',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#cbd5e1',
    },
    error: {
      main: '#ef4444',
    },
    success: {
      main: '#22c55e',
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: { fontSize: '28px', fontWeight: 700, color: '#f1f5f9' },
    h2: { fontSize: '24px', fontWeight: 600, color: '#f1f5f9' },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0f172a',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(15, 23, 42, 0.5)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#7c3aed',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 20px',
          transition: 'all 0.3s',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #7c3aed, #2563eb)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 20px rgba(124, 58, 237, 0.3)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(90deg, #22c55e, #16a34a)',
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: '#cbd5e1',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 41, 59, 0.6)',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 41, 59, 0.6)',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
        },
        elevation1: {
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(30, 41, 59, 0.95)',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #7c3aed, #2563eb)',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: 'rgba(15, 23, 42, 0.5)',
          color: '#94a3b8',
          fontWeight: 600,
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
        body: {
          color: '#cbd5e1',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(124, 58, 237, 0.05)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          borderRadius: '10px',
          '& input': {
            color: '#f1f5f9',
          },
          '& textarea': {
            color: '#f1f5f9',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7c3aed',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7c3aed',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',
        },
        focused: {
          color: '#7c3aed',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#f1f5f9',
        },
        icon: {
          color: '#cbd5e1',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
        colorSuccess: {
          background: 'rgba(34, 197, 94, 0.15)',
          color: '#22c55e',
        },
        colorError: {
          background: 'rgba(239, 68, 68, 0.15)',
          color: '#ef4444',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(30, 41, 59, 0.95)',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      },
    },
  },
});