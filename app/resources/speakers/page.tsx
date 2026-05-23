// app/resources/speakers/page.tsx
'use client';

import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const SpeakerList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Nom" />
      <TextField source="bio" label="Bio" />
    </Datagrid>
  </List>
);

export const SpeakerEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" label="ID" />
      <TextInput source="name" label="Nom" />
      <TextInput source="bio" label="Bio" multiline rows={3} />
      <TextInput source="photo" label="Photo URL" />
    </SimpleForm>
  </Edit>
);

export const SpeakerCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" label="ID" required />
      <TextInput source="name" label="Nom" required />
      <TextInput source="bio" label="Bio" multiline rows={3} />
      <TextInput source="photo" label="Photo URL" />
    </SimpleForm>
  </Create>
);