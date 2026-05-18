// app/resources/events/index.tsx
'use client';

import { List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const EventList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="title" label="Titre" />
      <DateField source="date" label="Date" />
      <TextField source="location" label="Lieu" />
    </Datagrid>
  </List>
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Titre" />
      <TextInput source="description" label="Description" />
      <TextInput source="date" label="Date" />
      <TextInput source="location" label="Lieu" />
    </SimpleForm>
  </Edit>
);

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Titre" />
      <TextInput source="description" label="Description" />
      <TextInput source="date" label="Date" />
      <TextInput source="location" label="Lieu" />
    </SimpleForm>
  </Create>
);