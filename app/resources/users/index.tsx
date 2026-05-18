'use client';

import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" label="Nom" />
      <EmailField source="email" label="Email" />
      <TextField source="role" label="Rôle" />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <TextInput source="email" label="Email" />
      <TextInput source="role" label="Rôle" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" label="Nom" />
      <TextInput source="email" label="Email" />
      <TextInput source="password" label="Mot de passe" type="password" />
      <TextInput source="role" label="Rôle" defaultValue="USER" />
    </SimpleForm>
  </Create>
);