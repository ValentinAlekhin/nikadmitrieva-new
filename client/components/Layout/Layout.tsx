import Head from 'next/head'

import Header from '@components/Header/Header'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Nika Dmitrieva</title>
      </Head>
      <Header />
      {children}
    </>
  )
}

export default Layout
