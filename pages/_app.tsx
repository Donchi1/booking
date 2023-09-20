import PLoader from '@/components/PLoader';
import Protected from '@/components/Protected';
import ProtectedAdmin from '@/components/ProtectedAdmin';
import { AuthContextProvider } from '@/context/AuthContext';
import { SearchContextProvider } from '@/context/SearchContext';
import { DarkModeContextProvider } from '@/context/darkModeContext';
import '@/styles/globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
   
  return (<Hydrated>
  <AuthContextProvider>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT as string } >
      <SearchContextProvider>
      <DarkModeContextProvider>

    {Component.defaultProps?.needsAuth ? (
      <Protected>
        {Component.defaultProps?.isAdmin ? (
          <ProtectedAdmin>
            <Component {...pageProps} />
          </ProtectedAdmin>
        ) : (
          <Component {...pageProps} />
          )}
      </Protected>
    ) : (
      <PLoader>
        <Component {...pageProps} />
      </PLoader>
    )}
    </DarkModeContextProvider>
  </SearchContextProvider>
  </GoogleOAuthProvider>
  </AuthContextProvider>
  </Hydrated>



);
}

const Hydrated = ({ children }: { children?: any }) => {
const [hydration, setHydration] = useState(false);

useEffect(() => {
if (typeof window !== "undefined") {
setHydration(true);
}
}, []);


return hydration ? children : "";
};


