import type { AppProps } from 'next/app'

import { FC } from 'react'

import Layout from '@components/Layout/Layout'
import GlobalStyles from '@styles/GlobalStyles'
import GlobalFonts from '@styles/GlobalFonts'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalFonts />
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
