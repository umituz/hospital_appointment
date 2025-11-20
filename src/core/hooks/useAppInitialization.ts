import { useEffect, useState } from 'react';
import { initializeApp } from '@core/config/appInitializer';

export const useAppInitialization = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeApp();
      setIsReady(true);
    };
    init();
  }, []);

  return { isReady };
};
