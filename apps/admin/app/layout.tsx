import './styles/global.css';

import {Inter} from 'next/font/google';
import {Metadata} from 'next';
import {LanguageProvider} from './contexts/LanguageContext';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Admin Panel - Comic, Movie, Novel Project',
  description: 'smartfren.com',
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${
            process?.env?.['BASE_PATH'] ?? ''
          }/favicon/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${
            process?.env?.['BASE_PATH'] ?? ''
          }/favicon/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${
            process?.env?.['BASE_PATH'] ?? ''
          }/favicon/favicon-16x16.png`}
        />
        <link
          rel="manifest"
          href={`${process?.env?.['BASE_PATH'] ?? ''}/favicon/site.webmanifest`}
        />
        <link
          rel="mask-icon"
          href={`${
            process?.env?.['BASE_PATH'] ?? ''
          }/favicon/safari-pinned-tab.svg`}
          color="#5bbad5"
        /> */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
          integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
          crossOrigin="anonymous"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <LanguageProvider>
        <body className={inter.className}>{children}</body>
      </LanguageProvider>
    </html>
  );
}
