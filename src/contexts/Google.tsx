import { ReactNode, useEffect, useState } from 'react';
import { createSafeContext, useSafeContext } from 'src/contexts/helpers';
import { GOOGLE_API_KEY } from '@utils/config';
import { Loader } from '@googlemaps/js-api-loader';

interface ContextValue {
  google?: typeof globalThis.google
}

const Context = createSafeContext<ContextValue>();

export const useGoogle = () => useSafeContext(Context);

interface GoogleProviderProps {
  children: ReactNode;
}

export const GoogleProvider = ({ children }: GoogleProviderProps) => {
  const [google, setGoogle] = useState<ContextValue["google"]>();

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_API_KEY,
      version: 'weekly',
      libraries: ["places"]
    });

    loader.load().then(() => {
      setGoogle(window.google);
    });
  });

  return <Context.Provider value={{ google }}>
    {children}
  </Context.Provider>;
}

