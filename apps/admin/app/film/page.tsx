/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import withRedux from '@/helpers/withRedux';
import AdminContainer from '@/components/AdminContainer/AdminContainer';
import LoginComponent from '@/components/Login/Login';
import { getCookie } from '@/helpers/getToken';

function Page() {
  const token = getCookie('token');

  const showAdminOrLogin = React.useMemo(
    () => (token ? <AdminContainer /> : <LoginComponent />),
    [token],
  );
  return <>{showAdminOrLogin}</>;
}

export default withRedux(Page);
