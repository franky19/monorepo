import {useEffect, useState} from 'react';

export const useMobileWidth = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const updateMedia = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return isMobile;
};

export const useTabletWidth = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1000);

  const updateMedia = () => {
    setIsTablet(window.innerWidth <= 1000);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return isTablet;
};
