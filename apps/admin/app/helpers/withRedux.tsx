'use client';

import React from 'react';
import ReduxProvider from '@/ReduxProvider';

const withRedux = <T,>(
  WrappedComponent: React.FunctionComponent,
  loading?: React.ReactNode,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (props: T) => {
    return (
      <ReduxProvider loading={loading}>
        <WrappedComponent {...props} />
      </ReduxProvider>
    );
  };
  return Component;
};

export default withRedux;
