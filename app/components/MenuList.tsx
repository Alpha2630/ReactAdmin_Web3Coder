// app/components/MenuList.tsx
'use client';

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePathname, useRouter } from 'next/navigation';

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'Événements', icon: <EventIcon />, path: '/events' },
  { label: 'Sessions', icon: <GroupIcon />, path: '/sessions' },
  { label: 'Intervenants', icon: <GroupIcon />, path: '/speakers' },
  { label: 'Salles', icon: <MeetingRoomIcon />, path: '/rooms' },
  { label: 'Utilisateurs', icon: <GroupIcon />, path: '/users' },
  { label: 'Paramètres', icon: <SettingsIcon />, path: '/settings' },
];

export default function MenuList() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    if (path === '/') {
      window.location.hash = '#/';
      router.push('/');
    } else {
      const resource = path.slice(1);
      window.location.hash = `#/${resource}`;
      router.push(`/#/${resource}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  // Vérifier si le chemin correspond au hash de React Admin
  const isActive = (path: string) => {
    if (typeof window === 'undefined') return false;
    const hash = window.location.hash;
    if (path === '/') {
      return hash === '' || hash === '#/';
    }
    return hash === `#${path}`;
  };

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#f1f5f9',
            fontWeight: 700,
            background: 'linear-gradient(90deg, #fff, #94a3b8)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          EventSync
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b' }}>
          Interface d'administration
        </Typography>
      </Box>

      {/* Menu */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: '10px',
                  mb: 0.5,
                  backgroundColor: active ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? '#7c3aed' : '#64748b',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: active ? '#f1f5f9' : '#94a3b8',
                      fontWeight: active ? 600 : 400,
                      fontSize: '14px',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Déconnexion */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: '10px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
            },
          }}
        >
          <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Déconnexion"
            sx={{
              '& .MuiListItemText-primary': {
                color: '#ef4444',
                fontWeight: 500,
                fontSize: '14px',
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}