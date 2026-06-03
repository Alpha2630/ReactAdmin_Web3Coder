"use client";

import { List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput, Create, NumberInput, EditButton, DeleteButton } from "react-admin";

export const SessionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Titre" />
      <DateField source="startTime" label="Debut" showTime />
      <DateField source="endTime" label="Fin" showTime />
      <TextField source="capacity" label="Capacite" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const SessionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" label="Titre" />
      <TextInput source="description" label="Description" multiline rows={3} />
      <TextInput source="startTime" label="Debut" type="datetime-local" />
      <TextInput source="endTime" label="Fin" type="datetime-local" />
      <NumberInput source="capacity" label="Capacite" />
      <NumberInput source="roomId" label="ID Salle" />
      <NumberInput source="eventId" label="ID Evenement" />
    </SimpleForm>
  </Edit>
);

export const SessionCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Titre" required />
      <TextInput source="description" label="Description" multiline rows={3} />
      <TextInput source="startTime" label="Debut" type="datetime-local" required />
      <TextInput source="endTime" label="Fin" type="datetime-local" required />
      <NumberInput source="capacity" label="Capacite" />
      <NumberInput source="roomId" label="ID Salle" required />
      <NumberInput source="eventId" label="ID Evenement" required />
    </SimpleForm>
  </Create>
);
