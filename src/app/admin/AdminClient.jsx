"use client";

import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { theme } from '../theme';
import { EventList, EventEdit, EventCreate } from '../resources/events/page';
import { SessionList, SessionEdit, SessionCreate } from '../resources/sessions/page';
import { SpeakerList, SpeakerEdit, SpeakerCreate } from '../resources/speakers/page';
import { RoomList, RoomEdit, RoomCreate } from '../resources/rooms/page';

const dataProvider = jsonServerProvider('http://localhost:3000/api');

export default function AdminClient() {
  return (
    <Admin dataProvider={dataProvider} theme={theme}>
      <Resource name="events" list={EventList} edit={EventEdit} create={EventCreate} options={{ label: '📅 Événements' }} />
      <Resource name="sessions" list={SessionList} edit={SessionEdit} create={SessionCreate} options={{ label: '🎯 Sessions' }} />
      <Resource name="speakers" list={SpeakerList} edit={SpeakerEdit} create={SpeakerCreate} options={{ label: '👥 Intervenants' }} />
      <Resource name="rooms" list={RoomList} edit={RoomEdit} create={RoomCreate} options={{ label: '🏢 Salles' }} />
    </Admin>
  );
}