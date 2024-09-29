'use client';
import {useLanguageDispatchContext} from '@/contexts/LanguageContext';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

const Page = () => {
  const router = useRouter();
  const {setLanguage} = useLanguageDispatchContext();
  useEffect(() => {
    setLanguage('en');
    router.replace('/');
  }, [router, setLanguage]);
  return null;
};

export default Page;
