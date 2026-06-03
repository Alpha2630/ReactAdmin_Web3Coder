type RecordObj = { id: number | string; [k: string]: any };

const store: Record<string, RecordObj[]> = {
  events: [
    { id: 1, title: "Conférence d'ouverture", startDate: "2026-06-10T09:00", endDate: "2026-06-10T10:00", location: "Salle A", category: "General" },
  ],
  sessions: [
    { id: 1, title: "Intro React", eventId: 1, speaker: "Alice" },
  ],
  speakers: [
    { id: 1, name: "Alice", bio: "Ingénieure frontend" },
  ],
  rooms: [
    { id: 1, name: "Salle A", capacity: 120 },
  ],
};

function clone<T>(v: T) {
  return JSON.parse(JSON.stringify(v)) as T;
}

function listFor(resource: string) {
  if (!store[resource]) store[resource] = [];
  return store[resource];
}

export const dataProvider = {
  async getList(resource: string) {
    const records = clone(listFor(resource));
    return { data: records, total: records.length };
  },

  async getOne(resource: string, { id }: { id: number | string }) {
    const record = listFor(resource).find((r) => String(r.id) === String(id));
    return { data: clone(record || {}) };
  },

  async create(resource: string, { data }: { data: Record<string, any> }) {
    const id = Date.now();
    const rec = { id, ...data };
    listFor(resource).push(rec as RecordObj);
    return { data: clone(rec) };
  },

  async update(resource: string, { id, data }: { id: number | string; data: Record<string, any> }) {
    const arr = listFor(resource);
    const idx = arr.findIndex((r) => String(r.id) === String(id));
    if (idx >= 0) arr[idx] = { ...arr[idx], ...data } as RecordObj;
    return { data: clone(arr[idx]) };
  },

  async delete(resource: string, { id }: { id: number | string }) {
    const arr = listFor(resource);
    const idx = arr.findIndex((r) => String(r.id) === String(id));
    const removed = idx >= 0 ? arr.splice(idx, 1)[0] : null;
    return { data: clone(removed) };
  },

  async getMany(resource: string, { ids }: { ids: Array<number | string> }) {
    const arr = listFor(resource);
    const set = new Set(ids.map(String));
    return { data: clone(arr.filter((r) => set.has(String(r.id)))) };
  },

  async getManyReference(resource: string) {
    const records = clone(listFor(resource));
    return { data: records, total: records.length };
  },

  async updateMany(resource: string, { ids, data }: { ids: Array<number | string>; data: Record<string, any> }) {
    const arr = listFor(resource);
    ids.forEach((id) => {
      const idx = arr.findIndex((r) => String(r.id) === String(id));
      if (idx >= 0) arr[idx] = { ...arr[idx], ...data } as RecordObj;
    });
    return { data: ids };
  },

  async deleteMany(resource: string, { ids }: { ids: Array<number | string> }) {
    const arr = listFor(resource);
    const removed: Array<number | string> = [];
    ids.forEach((id) => {
      const idx = arr.findIndex((r) => String(r.id) === String(id));
      if (idx >= 0) removed.push(arr.splice(idx, 1)[0].id);
    });
    return { data: removed };
  },
};

export default dataProvider;
