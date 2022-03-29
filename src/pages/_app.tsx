import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import { RoundProvider } from '../contexts/RoundContext';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RoundProvider>
      <Component {...pageProps} />
      <Toaster />
    </RoundProvider>
  );
}

export default MyApp;
