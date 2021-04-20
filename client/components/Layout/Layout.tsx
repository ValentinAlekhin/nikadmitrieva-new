import { FC } from 'react'
import Head from 'next/head'

import { Layout as Wrapper, Header, Content, Footer } from './styled'

interface Props {
  title?: string
  description?: string
  image?: string
  url?: string
}

const defaultProps: Props = {
  title: '',
  description:
    'Ника Дмитриева. Фотограф. На сайте собраны все лучшие работы. Приятного просмотра!',
  image: 'http://localhost:5000/api/client/image/PUOM-x5v4.jpg?width=600',
  url: 'http://nikadmitrieva.ru',
}

const Layout: FC<Props> = ({ children, title, description, image, url }) => {
  return (
    <>
      <Head>
        <title>Nika Dmitrieva {title || defaultProps.title}</title>
        <meta
          name="description"
          content={description || defaultProps.description}
        />
        <meta
          property="og:title"
          content={`Nika Dmitrieva ${title || defaultProps.title}`}
        />
        <meta
          property="og:description"
          content={description || defaultProps.description}
        />
        <meta property="og:image" content={image || defaultProps.image} />
        <meta property="og:url" content={`${defaultProps.url}${url || ''}`} />
        <meta property="og:site_name" content="Nikadmitrieva.ru" />
      </Head>
      <Wrapper>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Wrapper>
    </>
  )
}

export default Layout
