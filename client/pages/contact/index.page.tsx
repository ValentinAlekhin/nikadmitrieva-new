import { FC } from 'react'

import Layout from '@components/Layout/Layout'
import Container from '@components/Container/Container'

const Contacts: FC = () => {
  return (
    <Layout
      title="| Contacts"
      description="Ника Дмитриева. Фотограф. Контакты."
      url="/contact"
    >
      <Container>
        <h1>Contact</h1>
      </Container>
    </Layout>
  )
}

export default Contacts
