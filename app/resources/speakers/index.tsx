'use client';

import { List, Datagrid, TextField, EmailField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const SpeakerList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="firstName" label="Prénom" />
      <TextField source="lastName" label="Nom" />
      <EmailField source="email" label="Email" />
    </Datagrid>
  </List>
);

export const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="firstName" label="Prénom" />
      <TextInput source="lastName" label="Nom" />
      <TextInput source="email" label="Email" />
    </SimpleForm>
  </Edit>
);

export const SpeakerCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="firstName" label="Prénom" />
      <TextInput source="lastName" label="Nom" />
      <TextInput source="email" label="Email" />
    </SimpleForm>
  </Create>
);