"use client";

import authProvider from "@/authProvider";
import { Admin } from "react-admin";
import dataProvider from "@/dataProvider";
export default function AdminPage() {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      title="EventSync Admin"
    >
    </Admin>
  );
}