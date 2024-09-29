/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from 'react';
import Script from 'next/script';
import withRedux from '@/helpers/withRedux';
import ContainerTopup from './components/Container-topup';

function Page() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=GTM-M2KRRWR&l=dataLayer&cx=c"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'GTM-M2KRRWR');
            `}
      </Script>
      <ContainerTopup />
    </>
  );
}

export default withRedux(Page);
