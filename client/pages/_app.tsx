import type { AppProps } from 'next/app'

import { FC } from 'react'

import GlobalStyles from '@styles/GlobalStyles'
import GlobalFonts from '@styles/GlobalFonts'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalFonts />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default App
