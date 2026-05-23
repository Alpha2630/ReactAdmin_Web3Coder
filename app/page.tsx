// app/page.tsx
'use client';

import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { theme } from './theme';
import MenuList from './components/MenuList';
import { Box } from '@mui/material';
import { EventList, EventEdit, EventCreate } from './resources/events/page';
import { SessionList, SessionEdit, SessionCreate } from './resources/sessions/page';
import { SpeakerList, SpeakerEdit, SpeakerCreate } from './resources/speakers/page';
import { RoomList, RoomEdit, RoomCreate } from './resources/rooms/page';
import { UserList, UserEdit, UserCreate } from './resources/users/page';

const dataProvider = jsonServerProvider('http://localhost:3000/api');

export default function AdminApp() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0f172a' }}>
      <MenuList />
      <Box component="main" sx={{ flexGrow: 1, ml: 0, p: 3, mt: 0 }}>
        <Admin dataProvider={dataProvider} theme={theme}>
          <Resource name="events" list={EventList} edit={EventEdit} create={EventCreate} options={{ label: '📅 Événements' }} />
          <Resource name="sessions" list={SessionList} edit={SessionEdit} create={SessionCreate} options={{ label: '🎯 Sessions' }} />
          <Resource name="speakers" list={SpeakerList} edit={SpeakerEdit} create={SpeakerCreate} options={{ label: '👥 Intervenants' }} />
          <Resource name="rooms" list={RoomList} edit={RoomEdit} create={RoomCreate} options={{ label: '🏢 Salles' }} />
          <Resource name="admins" list={UserList} edit={UserEdit} create={UserCreate} options={{ label: '👤 Utilisateurs' }} />
        </Admin>
      </Box>
    </Box>
  );
}