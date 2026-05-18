// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@eventsync.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [serverActive, setServerActive] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Pour le développement, connexion directe
    if (email === 'admin@eventsync.com' && password === '123456789') {
      localStorage.setItem('token', 'fake-token');
      router.push('/');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleToggleServer = () => {
    setServerActive(!serverActive);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setServerActive(false);
    setEmail('');
    setPassword('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%)',
          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 450,
          p: 4,
          background: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #fff, #94a3b8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            EventSync
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Espace administratif
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            required
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                borderRadius: '10px',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: '#7c3aed',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7c3aed',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#94a3b8',
                '&.Mui-focused': {
                  color: '#7c3aed',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#f1f5f9',
              },
            }}
          />

          {/* Mot de passe */}
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            required
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                borderRadius: '10px',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: '#7c3aed',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#7c3aed',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#94a3b8',
                '&.Mui-focused': {
                  color: '#7c3aed',
                },
              },
              '& .MuiOutlinedInput-input': {
                color: '#f1f5f9',
              },
            }}
          />

          {/* Serveur Status */}
          <Box
            sx={{
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '10px',
              p: 2,
              mb: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1 }}>
              {!serverActive 
                ? "Si le serveur de mot n'est pas activé, sélectionner" 
                : "Si le serveur de mot est activé, sélectionner"}
            </Typography>
            <Button
              variant="contained"
              onClick={!serverActive ? handleToggleServer : handleLogout}
              sx={{
                background: !serverActive ? '#22c55e' : '#ef4444',
                textTransform: 'none',
                borderRadius: '8px',
                px: 3,
                '&:hover': {
                  background: !serverActive ? '#16a34a' : '#dc2626',
                },
              }}
            >
              {!serverActive ? "Activer" : "Déconnexion"}
            </Button>
          </Box>

          {/* Erreur */}
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
              {error}
            </Alert>
          )}

          {/* Bouton connexion */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              background: 'linear-gradient(90deg, #7c3aed, #2563eb)',
              borderRadius: '10px',
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '16px',
              '&:hover': {
                background: 'linear-gradient(90deg, #6d28d9, #1d4ed8)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s',
            }}
          >
            Se connecter
          </Button>
        </form>
      </Paper>
    </Box>
  );
}