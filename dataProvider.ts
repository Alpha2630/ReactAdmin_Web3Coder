import simpleRestProvider from "ra-data-simple-rest";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const dataProvider = simpleRestProvider(`${API_URL}/api`);

export default dataProvider;