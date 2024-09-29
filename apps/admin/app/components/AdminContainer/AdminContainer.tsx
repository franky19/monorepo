/** @format */

'use client';
import {usePathname} from 'next/navigation';
import {useCallback, useEffect, useMemo, useState} from 'react';
import AdminLayout from '../AdminLayout/AdminLayout';
import Dashboard from '../Dashboard/Dashboard';
import Film from '../Film/Film';

const AdminContainer = () => {
  const pathName = usePathname();
  console.log('pathname:', pathName);
  const showDashboard = useMemo(
    () => pathName === '/admin/dashboard' || pathName === '/',
    [],
  );
  const showFilm = useMemo(
    () => pathName === '/film' || pathName === '/admin/film',
    [],
  );

  const Logout = useCallback(() => {
    console.log('logout');
  }, []);

  return (
    <AdminLayout logout={Logout}>
      {showDashboard && <Dashboard />}
      {showFilm && <Film/>}
    </AdminLayout>
  );
};
export default AdminContainer;
