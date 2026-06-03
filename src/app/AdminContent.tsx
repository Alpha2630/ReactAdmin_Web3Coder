'use client';

import AdminClient from './admin/AdminClient';

export default function AdminContent() {
  return <AdminClient requireAdminPath={false} useAuth={false} />;
}
