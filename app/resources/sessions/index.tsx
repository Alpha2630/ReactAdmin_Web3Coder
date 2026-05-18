'use client';

import { List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const SessionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" label="Nom" />
      <DateField source="date" label="Date" />
      <TextField source="location" label="Lieu" />
    </Datagrid>
  </List>
);

export const SessionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <TextInput source="description" label="Description" />
      <TextInput source="date" label="Date" />
      <TextInput source="location" label="Lieu" />
    </SimpleForm>
  </Edit>
);

export const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <TextInput source="description" label="Description" />
      <TextInput source="date" label="Date" />
      <TextInput source="location" label="Lieu" />
    </SimpleForm>
  </Create>
);