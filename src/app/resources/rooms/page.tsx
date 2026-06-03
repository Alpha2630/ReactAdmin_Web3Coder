// app/resources/rooms/page.tsx
'use client';

import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, EditButton, DeleteButton } from 'react-admin';

export const RoomList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nom" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom" required />
    </SimpleForm>
  </Create>
);