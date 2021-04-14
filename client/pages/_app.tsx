import type { AppProps } from 'next/app'

import Layout from '@components/Layout/Layout'
import GlobalStyles from '@styles/GlobalStyles'
import GlobalFonts from '@styles/GlobalFonts'

const MyApp = ({ Component, pageProps }: AppProps) => {
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
