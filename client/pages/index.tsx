import type { GetStaticProps } from 'next'
import Link from 'next/link'
import { FC } from 'react'

import { RootResponse, Series } from '@interfaces/ServerResponses'

import Layout from '@components/Layout/Layout'
import Container from '@components/Container/Container'
import Grid from 'components/Grid/Grid'
import SeriesCard from 'components/SeriesCard/SeriesCard'

interface Props {
  series: Series[]
}

const Home: FC<Props> = ({ series }) => {
  const gridItems = series.map(({ title, titleImage, _id }, i) => (
    <Link key={i} href={`/series/${_id}`}>
      <a>
        <SeriesCard title={title} image={titleImage} />
      </a>
    </Link>
  ))

  return (
    <Layout>
      <Container>
        <div>
          <Grid>{gridItems}</Grid>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:5000/api/client')
  const { series }: RootResponse = await res.json()

  return {
    props: {
      series,
    },
  }
}

export default Home
