// app/resources/users/index.tsx
'use client';

import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <EmailField source="email" label="Email" />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="email" label="Email" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="email" label="Email" required />
      <TextInput source="password_hash" label="Mot de passe" type="password" required />
    </SimpleForm>
  </Create>
);