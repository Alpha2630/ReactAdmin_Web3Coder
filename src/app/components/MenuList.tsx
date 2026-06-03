// app/components/MenuList.tsx
'use client';

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter, usePathname } from 'next/navigation';

const resourcePaths = ['/events', '/sessions', '/speakers', '/rooms'];

const menuItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { label: 'Evenements', icon: <EventIcon />, path: '/events' },
  { label: 'Sessions', icon: <GroupIcon />, path: '/sessions' },
  { label: 'Intervenants', icon: <GroupIcon />, path: '/speakers' },
  { label: 'Salles', icon: <MeetingRoomIcon />, path: '/rooms' },
  { label: 'Utilisateurs', icon: <GroupIcon />, path: '/users' },
  { label: 'Parametres', icon: <SettingsIcon />, path: '/settings' },
];

export default function MenuList() {
  const router = useRouter();
  const pathname = usePathname();
  const inAdmin = pathname.startsWith('/admin');

  const handleNavigation = (path: string) => {
    if (resourcePaths.includes(path) && typeof window !== 'undefined') {
      const targetPath = `${inAdmin ? '/admin' : ''}${path}`;

      // Let react-admin's router handle resource changes without a full Next.js
      // navigation, while keeping the URL aligned with the active admin base path.
      window.history.pushState({}, '', targetPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
      return;
    }

    router.push(inAdmin && path === '/' ? '/admin' : path);
  };

  const handleLogout = () => {
    try {
      fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    } finally {
      try {
        localStorage.removeItem('token');
      } catch {}
      router.push(inAdmin ? '/admin/login' : '/login');
    }
  };

  const isActive = (path: string) => pathname === path || pathname === `/admin${path}`;

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
        zIndex: 1100,
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#f1f5f9', fontWeight: 700 }}>
          EventSync
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b' }}>
          Administration
        </Typography>
      </Box>

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
                  '&:hover': { backgroundColor: 'rgba(124, 58, 237, 0.1)' },
                }}
              >
                <ListItemIcon sx={{ color: active ? '#7c3aed' : '#64748b', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ '& .MuiListItemText-primary': { color: active ? '#f1f5f9' : '#94a3b8', fontWeight: active ? 600 : 400, fontSize: '14px' } }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{ borderRadius: '10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.2)' } }}
        >
          <ListItemIcon sx={{ color: '#ef4444', minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Deconnexion" sx={{ '& .MuiListItemText-primary': { color: '#ef4444', fontSize: '14px' } }} />
        </ListItemButton>
      </Box>
    </Box>
  );
}
