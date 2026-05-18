// app/page.tsx
'use client';

import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { theme } from './theme';
import MenuList from './components/MenuList';
import { Box } from '@mui/material';

const dataProvider = jsonServerProvider('http://localhost:3000/api');

export default function AdminApp() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f172a' }}>
      <MenuList />
      <Box component="main" sx={{ flexGrow: 1, ml: 0, p: 3, mt: 0 }}>
        <Admin 
          dataProvider={dataProvider} 
          theme={theme}
          layout={({ children }) => <>{children}</>}
        >
          <Resource name="events" options={{ label: '📅 Événements' }} />
          <Resource name="sessions" options={{ label: '🎯 Sessions' }} />
          <Resource name="speakers" options={{ label: '👥 Intervenants' }} />
          <Resource name="rooms" options={{ label: '🏢 Salles' }} />
          <Resource name="users" options={{ label: '👤 Utilisateurs' }} />
        </Admin>
      </Box>
    </Box>
  );
}