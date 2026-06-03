import type { DataProvider, RaRecord } from "react-admin";

const API_URL = "/api";

type ApiRecord = RaRecord & Record<string, unknown>;
type DataParams = {
  id: string | number;
  ids: Array<string | number>;
  data: Record<string, unknown>;
  previousData?: ApiRecord;
};

async function request(path: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Erreur API");
  }

  return data;
}

function unwrapRecord(payload: unknown, fallback?: ApiRecord): ApiRecord {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: ApiRecord }).data;
  }

  if (payload && typeof payload === "object" && "success" in payload && fallback) {
    return fallback;
  }

  return payload as ApiRecord;
}

function preparePayload(resource: string, data: Record<string, unknown>) {
  if (resource === "events") {
    return {
      ...data,
      date: data.date ?? data.startDate,
    };
  }

  return data;
}

const dataProviderImpl = {
  async getList(resource: string) {
    const data = await request(`/${resource}`);
    const records = Array.isArray(data) ? data : data?.data ?? [];

    return {
      data: records,
      total: records.length,
    };
  },

  async getOne(resource: string, params: Pick<DataParams, "id">) {
    const data = await request(`/${resource}/${params.id}`);

    return {
      data: unwrapRecord(data),
    };
  },

  async create(resource: string, params: Pick<DataParams, "data">) {
    const data = await request(`/${resource}`, {
      method: "POST",
      body: JSON.stringify(preparePayload(resource, params.data)),
    });

    return {
      data: unwrapRecord(data),
    };
  },

  async update(resource: string, params: Pick<DataParams, "id" | "data" | "previousData">) {
    const data = await request(`/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(preparePayload(resource, params.data)),
    });

    return {
      data: unwrapRecord(data, params.previousData),
    };
  },

  async delete(resource: string, params: Pick<DataParams, "id" | "previousData">) {
    const data = await request(`/${resource}/${params.id}`, {
      method: "DELETE",
    });

    return {
      data: unwrapRecord(data, params.previousData),
    };
  },

  async getMany(resource: string, params: Pick<DataParams, "ids">) {
    const data = await request(`/${resource}`);
    const records = Array.isArray(data) ? data : data?.data ?? [];
    const ids = new Set(params.ids.map(String));

    return {
      data: records.filter((record: ApiRecord) => ids.has(String(record.id))),
    };
  },

  async getManyReference(resource: string) {
    const data = await request(`/${resource}`);
    const records = Array.isArray(data) ? data : data?.data ?? [];

    return {
      data: records,
      total: records.length,
    };
  },

  async updateMany(resource: string, params: Pick<DataParams, "ids" | "data">) {
    await Promise.all(
      params.ids.map((id) =>
        request(`/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(preparePayload(resource, params.data)),
        }),
      ),
    );

    return { data: params.ids };
  },

  async deleteMany(resource: string, params: Pick<DataParams, "ids">) {
    await Promise.all(
      params.ids.map((id) =>
        request(`/${resource}/${id}`, {
          method: "DELETE",
        }),
      ),
    );

    return { data: params.ids };
  },
};

export const dataProvider = dataProviderImpl as DataProvider;
