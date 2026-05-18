// app/components/DatagridCustom.tsx
'use client';

import { styled } from '@mui/material/styles';
import { Datagrid } from 'react-admin';

export const DatagridCustom = styled(Datagrid)(({ theme }) => ({
  '& .RaDatagrid-table': {
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    overflow: 'hidden',
  },
  '& .RaDatagrid-thead th': {
    background: 'rgba(15, 23, 42, 0.5)',
    color: '#94a3b8',
    fontWeight: 600,
    fontSize: '13px',
  },
  '& .RaDatagrid-tbody td': {
    color: '#cbd5e1',
    fontSize: '14px',
  },
  '& .RaDatagrid-tbody tr:hover td': {
    background: 'rgba(124, 58, 237, 0.05)',
  },
}));