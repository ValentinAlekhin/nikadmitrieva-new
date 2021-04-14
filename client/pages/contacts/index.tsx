import Head from 'next/head'

import Container from '@components/Container/Container'

const Contacts = () => {
  const description = `Ника Дмитриева. Художник и фотограф. Контакты.`

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:title" content={description} key="og:title" />
        <title>Nika Dmitrieva | Contacts</title>
      </Head>
      <Container>
        <h1>Contacts</h1>
      </Container>
    </>
  )
}

export default Contacts
