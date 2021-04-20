import { FC } from 'react'

import Layout from '@components/Layout/Layout'

import { Wrapper, ErrorNum, ErrorText } from './styled'

const NotFound: FC = () => {
  return (
    <Layout>
      <Wrapper>
        <ErrorNum>404</ErrorNum>
        <ErrorText>Страница не найдена</ErrorText>
      </Wrapper>
    </Layout>
  )
}

export default NotFound
