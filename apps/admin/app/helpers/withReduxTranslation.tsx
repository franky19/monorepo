'use client';

import React from 'react';
import ReduxProvider from '@/ReduxProvider';

type LanguageProps = {id: string; en: string};

const Loading = (props: LanguageProps) => props.id;

const withReduxTranslation = <T,>(
  WrappedComponent: React.FunctionComponent,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (props: T) => {
    return (
      <ReduxProvider loading={<Loading {...(props as LanguageProps)} />}>
        <WrappedComponent {...props} />
      </ReduxProvider>
    );
  };
  return Component;
};

export default withReduxTranslation;
