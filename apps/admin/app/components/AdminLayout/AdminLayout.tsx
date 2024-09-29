/** @format */

'use client';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {ImageAsset} from '../ImageAsset';

type AdminLayoutProps = {
  children: ReactNode;
  logout?: () => void;
};

const AdminLayout = ({children, logout}: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathName = usePathname();
  // const route = useRouter();
  const showDashboard = useMemo(
    () => pathName === '/admin/dashboard' || pathName === '/admin',
    [],
  );
  const darkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  const lightIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
  return (
    <div className={`flex h-screen bg-gray-900 text-gray-900 text-gray-100`}>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-gray-200 dark:bg-gray-800 opacity-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}></div>
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-[#f8f4f3] dark:bg-gray-800 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }`}>
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <svg
              className="w-12 h-12"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                fill="#4C51BF"
                stroke="#4C51BF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"></path>
            </svg>

            <span className="mx-2 text-2xl font-semibold text-gray-700 ">
              Admin Panel
            </span>
            {sidebarOpen && (
              <button onClick={() => setSidebarOpen(false)}>
                <svg
                  className="fill-current"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                    fill=""></path>
                </svg>
              </button>
            )}
          </div>
        </div>
        <nav className="mt-10">
          <div className="mb-2">
            <h3 className="ml-4 text-sm font-semibold text-gray-400">Menu</h3>
            <Link
              className={`${
                showDashboard &&
                ' text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:bg-opacity-25 bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
             <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.10322 0.956299H2.53135C1.5751 0.956299 0.787598 1.7438 0.787598 2.70005V6.27192C0.787598 7.22817 1.5751 8.01567 2.53135 8.01567H6.10322C7.05947 8.01567 7.84697 7.22817 7.84697 6.27192V2.72817C7.8751 1.7438 7.0876 0.956299 6.10322 0.956299ZM6.60947 6.30005C6.60947 6.5813 6.38447 6.8063 6.10322 6.8063H2.53135C2.2501 6.8063 2.0251 6.5813 2.0251 6.30005V2.72817C2.0251 2.44692 2.2501 2.22192 2.53135 2.22192H6.10322C6.38447 2.22192 6.60947 2.44692 6.60947 2.72817V6.30005Z" fill=""></path><path d="M15.4689 0.956299H11.8971C10.9408 0.956299 10.1533 1.7438 10.1533 2.70005V6.27192C10.1533 7.22817 10.9408 8.01567 11.8971 8.01567H15.4689C16.4252 8.01567 17.2127 7.22817 17.2127 6.27192V2.72817C17.2127 1.7438 16.4252 0.956299 15.4689 0.956299ZM15.9752 6.30005C15.9752 6.5813 15.7502 6.8063 15.4689 6.8063H11.8971C11.6158 6.8063 11.3908 6.5813 11.3908 6.30005V2.72817C11.3908 2.44692 11.6158 2.22192 11.8971 2.22192H15.4689C15.7502 2.22192 15.9752 2.44692 15.9752 2.72817V6.30005Z" fill=""></path><path d="M6.10322 9.92822H2.53135C1.5751 9.92822 0.787598 10.7157 0.787598 11.672V15.2438C0.787598 16.2001 1.5751 16.9876 2.53135 16.9876H6.10322C7.05947 16.9876 7.84697 16.2001 7.84697 15.2438V11.7001C7.8751 10.7157 7.0876 9.92822 6.10322 9.92822ZM6.60947 15.272C6.60947 15.5532 6.38447 15.7782 6.10322 15.7782H2.53135C2.2501 15.7782 2.0251 15.5532 2.0251 15.272V11.7001C2.0251 11.4188 2.2501 11.1938 2.53135 11.1938H6.10322C6.38447 11.1938 6.60947 11.4188 6.60947 11.7001V15.272Z" fill=""></path><path d="M15.4689 9.92822H11.8971C10.9408 9.92822 10.1533 10.7157 10.1533 11.672V15.2438C10.1533 16.2001 10.9408 16.9876 11.8971 16.9876H15.4689C16.4252 16.9876 17.2127 16.2001 17.2127 15.2438V11.7001C17.2127 10.7157 16.4252 9.92822 15.4689 9.92822ZM15.9752 15.272C15.9752 15.5532 15.7502 15.7782 15.4689 15.7782H11.8971C11.6158 15.7782 11.3908 15.5532 11.3908 15.272V11.7001C11.3908 11.4188 11.6158 11.1938 11.8971 11.1938H15.4689C15.7502 11.1938 15.9752 11.4188 15.9752 11.7001V15.272Z" fill=""></path></svg>

              <span className="mx-3">Dashboard</span>
            </Link>
            <Link
              className={`${
                showDashboard &&
                ' text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:bg-opacity-25 bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/film">
              <ImageAsset src={'icons/movie.svg'} width={20} height={20} />

              <span className="mx-3">Film</span>
            </Link>
            <Link
              className={`${
                showDashboard && ' text-gray-700  bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2  text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
              <ImageAsset src={'icons/comic.svg'} width={24} height={24} />

              <span className="mx-3">Comic</span>
            </Link>
            <Link
              className={`${
                showDashboard && ' text-gray-700  bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
              <ImageAsset src={'icons/leather.svg'} width={24} height={24} />
              <span className="mx-3">Novel</span>
            </Link>
          </div>
          <div className="mb-2">
            <h3 className="ml-4 text-sm font-semibold text-gray-400">User</h3>
            <Link
              className={`${
                showDashboard &&
                ' text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:bg-opacity-25 bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
              <ImageAsset src={'icons/users.svg'} width={24} height={24} />
              <span className="mx-3">List User</span>
            </Link>
            <Link
              className={`${
                showDashboard &&
                ' text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:bg-opacity-25 bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
              <ImageAsset src={'icons/card.svg'} width={24} height={24} />

              <span className="mx-3">Subscription</span>
            </Link>
          </div>
          <div className="mb-2">
            <h3 className="ml-4 text-sm font-semibold text-gray-400">Report</h3>
            <Link
              className={`${
                showDashboard &&
                ' text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:bg-opacity-25 bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
              <ImageAsset src={'icons/movie.svg'} width={20} height={20} />

              <span className="mx-3">Film</span>
            </Link>
            <Link
              className={`${
                showDashboard && ' text-gray-700  bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2  text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
              <ImageAsset src={'icons/comic.svg'} width={24} height={24} />

              <span className="mx-3">Comic</span>
            </Link>
            <Link
              className={`${
                showDashboard && ' text-gray-700  bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
              <ImageAsset src={'icons/leather.svg'} width={24} height={24} />
              <span className="mx-3">Novel</span>
            </Link>
            <Link
              className={`${
                showDashboard &&
                ' text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:bg-opacity-25 bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
              <ImageAsset src={'icons/users.svg'} width={24} height={24} />
              <span className="mx-3">List User</span>
            </Link>
            <Link
              className={`${
                showDashboard &&
                ' text-gray-700 dark:text-gray-100 dark:bg-gray-700 dark:bg-opacity-25 bg-gray-700 bg-opacity-25'
              } flex items-center px-6 py-2 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100`}
              href="/dashboard">
              <ImageAsset src={'icons/card.svg'} width={24} height={24} />

              <span className="mx-3">Subscription</span>
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-[#f8f4f3] dark:bg-gray-800 border-b-4 border-indigo-600">
          <div className="flex items-center">
            <button
              className="text-gray-500 focus:outline-none lg:hidden"
              onClick={() => setSidebarOpen(true)}>
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 6H20M4 12H20M4 18H11"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button
                className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                <Image
                  src={
                    'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=296&amp;q=80'
                  }
                  alt="avatar"
                  width={200}
                  height={200}
                />
              </button>

              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`fixed inset-0 z-10 w-full h-full ${
                  dropdownOpen ? 'block' : 'hidden'
                }`}></div>

              <div
                className={`absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl ${
                  dropdownOpen ? 'block' : 'hidden'
                }`}>
                <div
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white`}
                  onClick={logout}>
                  Logout
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f1f5f9]">
          <div className="lg:container px-6 py-8 mx-auto  min-h-screen">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
