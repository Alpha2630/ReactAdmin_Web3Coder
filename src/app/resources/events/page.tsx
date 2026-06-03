// app/resources/events/page.tsx
'use client';

import { List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput, Create } from 'react-admin';

export const EventList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Titre" />
      <DateField source="startDate" label="Date début" />
      <DateField source="endDate" label="Date fin" />
      <TextField source="location" label="Lieu" />
    </Datagrid>
  </List>
);

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Titre" />
      <TextInput source="description" label="Description" multiline rows={4} />
      <TextInput source="startDate" label="Date début" type="datetime-local" />
      <TextInput source="endDate" label="Date fin" type="datetime-local" />
      <TextInput source="location" label="Lieu" />
      <TextInput source="category" label="Catégorie" />
    </SimpleForm>
  </Edit>
);

export const EventCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Titre" required />
      <TextInput source="description" label="Description" multiline rows={4} />
      <TextInput source="category" label="Catégorie" />
      <TextInput source="image" label="Image URL" />
      <TextInput source="startDate" label="Date début" type="datetime-local" required />
      <TextInput source="endDate" label="Date fin" type="datetime-local" required />
      <TextInput source="location" label="Lieu" required />
    </SimpleForm>
  </Create>
);