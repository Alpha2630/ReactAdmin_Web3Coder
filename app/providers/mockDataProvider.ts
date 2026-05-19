// app/providers/mockDataProvider.ts
import { DataProvider, RaRecord } from 'react-admin';

// Types spécifiques pour chaque ressource
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  reference?: string;
}

interface Session {
  id: number;
  name: string;
  date: string;
  location: string;
  endDate?: string;
}

interface Speaker {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  specialty?: string;
}

interface Room {
  id: number;
  name: string;
  platformNumber?: string;
  capacity?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

// Données mock typées
const mockData: {
  events: Event[];
  sessions: Session[];
  speakers: Speaker[];
  rooms: Room[];
  users: User[];
} = {
  events: [
    { id: 1, title: "Dev Conférence 2026", date: "2026-06-15", location: "Paris", reference: "DEV2026" },
    { id: 2, title: "AI Summit 2026", date: "2026-09-20", location: "Lyon", reference: "AI2026" },
  ],
  sessions: [
    { id: 1, name: "Session B", date: "2026-06-15T10:00:00", location: "Salle A" },
    { id: 2, name: "Session C", date: "2026-06-15T14:00:00", location: "Salle B" },
  ],
  speakers: [
    { id: 1, firstName: "Jean", lastName: "Dupont", email: "jean@example.com", specialty: "React" },
    { id: 2, firstName: "Marie", lastName: "Martin", email: "marie@example.com", specialty: "AI" },
  ],
  rooms: [
    { id: 1, name: "Salle A", platformNumber: "101", capacity: 100 },
    { id: 2, name: "Salle B", platformNumber: "102", capacity: 150 },
  ],
  users: [
    { id: 1, name: "Admin", email: "admin@eventsync.com", role: "ADMIN" },
  ],
};

// Type pour les ressources possibles
type ResourceName = keyof typeof mockData;

export const mockDataProvider: DataProvider = {
  async getList(resource: string) {
    const data = mockData[resource as ResourceName] || [];
    return {
      data: data as RaRecord[],
      total: data.length,
    };
  },

  async getOne(resource: string, params: { id: number }) {
    const data = mockData[resource as ResourceName];
    const item = data?.find((item) => item.id === params.id);
    return { data: item as RaRecord };
  },

  async getMany(resource: string, params: { ids: number[] }) {
    const data = mockData[resource as ResourceName];
    const items = data?.filter((item) => params.ids.includes(item.id)) || [];
    return { data: items as RaRecord[] };
  },

  async getManyReference(resource: string) {
    const data = mockData[resource as ResourceName] || [];
    return {
      data: data as RaRecord[],
      total: data.length,
    };
  },

  async create(resource: string, params: { data: Record<string, unknown> }) {
    const newItem = { id: Date.now(), ...params.data };
    return { data: newItem as RaRecord };
  },

  async update(resource: string, params: { data: Record<string, unknown> }) {
    return { data: params.data as RaRecord };
  },

  async updateMany(resource: string, params: { ids: number[] }) {
    return { data: params.ids };
  },

  async delete(resource: string, params: { id: number }) {
    return { data: { id: params.id } as RaRecord };
  },

  async deleteMany(resource: string, params: { ids: number[] }) {
    return { data: params.ids };
  },
};