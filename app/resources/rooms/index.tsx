'use client';

import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const RoomList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" label="Nom" />
      <TextField source="platformNumber" label="Plateforme" />
    </Datagrid>
  </List>
);

export const RoomEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <TextInput source="platformNumber" label="Numéro de plateforme" />
    </SimpleForm>
  </Edit>
);

export const RoomCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <TextInput source="platformNumber" label="Numéro de plateforme" />
    </SimpleForm>
  </Create>
);