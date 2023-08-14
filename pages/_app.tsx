import {FunctionComponent} from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightTheme';
import '../styles/globals.css';

import Head from 'next/head';
import Header from '@components/NavBar';
import Footer from '@components/Footer';
import { Toaster } from 'sonner';
interface ApplicationAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    },
  },
});
const Application: FunctionComponent<ApplicationAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <div data-theme="light">
            <Head>
              <title>Boston Police Index</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <main className='min-h-[calc(100vh-310px)]'>
              <Component {...pageProps} />
              <Toaster richColors closeButton/>
            </main>
            <Footer/>
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Application;
