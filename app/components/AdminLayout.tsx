// app/components/AdminLayout.tsx
'use client';

import { Layout } from 'react-admin';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Menu latéral personnalisé
const CustomSidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <aside
      style={{
        width: 280,
        background: 'rgba(30, 41, 59, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto',
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <Typography variant="h6" sx={{ color: '#f1f5f9', fontWeight: 700 }}>
          🎟️ EventSync
        </Typography>
        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
          Administration
        </Typography>
      </Box>
      <nav style={{ padding: '16px 0' }}>
        {children}
      </nav>
    </aside>
  );
};

// Barre d'en-tête personnalisée
const CustomAppBar = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AppBar
      {...props}
      sx={{
        background: 'linear-gradient(90deg, #7c3aed, #2563eb)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        position: 'fixed',
        left: 280,
        width: 'calc(100% - 280px)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
            Tableau de bord
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}>
              A
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                background: 'rgba(30, 41, 59, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
              },
            }}
          >
            <MenuItem onClick={handleLogout} sx={{ color: '#ef4444', gap: 1 }}>
              <LogoutIcon fontSize="small" />
              Déconnexion
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Layout personnalisé
export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/', resource: 'dashboard' },
    { label: 'Événements', icon: <EventIcon />, path: '/events', resource: 'events' },
    { label: 'Sessions', icon: <GroupIcon />, path: '/sessions', resource: 'sessions' },
    { label: 'Intervenants', icon: <GroupIcon />, path: '/speakers', resource: 'speakers' },
    { label: 'Salles', icon: <MeetingRoomIcon />, path: '/rooms', resource: 'rooms' },
    { label: 'Utilisateurs', icon: <GroupIcon />, path: '/users', resource: 'users' },
    { label: 'Paramètres', icon: <SettingsIcon />, path: '/settings', resource: 'settings' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f172a' }}>
      {/* Sidebar pour desktop */}
      <CustomSidebar>
        {menuItems.map((item) => (
          <Link
            key={item.resource}
            href={item.path}
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 1.5,
                mx: 1,
                borderRadius: '10px',
                color: '#cbd5e1',
                transition: 'all 0.3s',
                '&:hover': {
                  background: 'rgba(124, 58, 237, 0.1)',
                  color: '#f1f5f9',
                },
              }}
            >
              {item.icon}
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {item.label}
              </Typography>
            </Box>
          </Link>
        ))}
      </CustomSidebar>

      {/* Contenu principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: 0,
          mt: 8,
          p: 3,
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};