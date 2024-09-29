'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type LanguageState = {
  language?: 'id' | 'en';
};

type ContextStateTypesProps = {
  languageState: LanguageState;
};

type ContextDispatchTypesProps = {
  changeLanguage: () => void;
  setLanguage: (langaugeCode: 'id' | 'en') => void;
};

export const LanguageStateContext = createContext<ContextStateTypesProps>(
  {} as ContextStateTypesProps,
);
export const LanguageDispatchContext = createContext<ContextDispatchTypesProps>(
  {} as ContextDispatchTypesProps,
);

export const LanguageProvider = ({children}) => {
  const [languageState, setLanguageState] = useState<LanguageState>({
    language: undefined,
  });

  useEffect(() => {
    let localLanguage = localStorage.getItem('language') ?? 'id';
    if (localLanguage !== 'id' && localLanguage !== 'en') {
      localStorage.setItem('language', 'id');
      localLanguage = 'id';
    }
    setLanguageState({language: localLanguage as 'id' | 'en'});
  }, []);

  const changeLanguage = useCallback(() => {
    if (languageState.language === 'id') {
      setLanguageState({language: 'en'});
      localStorage.setItem('language', 'en');
    }
    if (languageState.language === 'en') {
      setLanguageState({language: 'id'});
      localStorage.setItem('language', 'id');
    }
  }, [languageState.language]);

  const setLanguage = useCallback((languageCode: 'id' | 'en') => {
    if (languageCode === 'id') {
      setLanguageState({language: 'id'});
      localStorage.setItem('language', 'id');
    }
    if (languageCode === 'en') {
      setLanguageState({language: 'en'});
      localStorage.setItem('language', 'en');
    }
  }, []);

  return (
    <LanguageStateContext.Provider value={{languageState}}>
      <LanguageDispatchContext.Provider value={{changeLanguage, setLanguage}}>
        {children}
      </LanguageDispatchContext.Provider>
    </LanguageStateContext.Provider>
  );
};

export const useLanguageStateContext = () => {
  return useContext(LanguageStateContext);
};

export const useLanguageDispatchContext = () => {
  return useContext(LanguageDispatchContext);
};
