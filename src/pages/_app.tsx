import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { persistor, store } from '../stores/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import '../css/main.css'
import MainLayout from '../layouts/MainLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const title = `Call of Dragons DB`
  const description = 'Call of Dragons - Guides and Tools'

  // const url = 'https://justboil.github.io/admin-one-react-tailwind/'

  // const image = `https://static.justboil.me/templates/one/repo-tailwind-react.png`

  // const imageWidth = '1920'

  // const imageHeight = '960'

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLayout>
          <Head>
            <meta name="description" content={description} />
            {/* 
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="JustBoil.me" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content={imageWidth} />
            <meta property="og:image:height" content={imageHeight} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image:src" content={image} />
            <meta property="twitter:image:width" content={imageWidth} />
            <meta property="twitter:image:height" content={imageHeight} /> */}

            <link rel="icon" href="/favicon.jpg" />
          </Head>

          {/* <Script
            src="https://www.googletagmanager.com/gtag/js?id=UA-130795909-1"
            strategy="afterInteractive"
          /> */}

          {/* <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-130795909-1');
            `}
          </Script> */}
          <ToastContainer
            position="top-center"
            theme="dark"
            pauseOnFocusLoss={false}
          />
          <Component {...pageProps} />
        </MainLayout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
