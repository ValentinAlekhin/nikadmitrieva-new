import { FC } from 'react'
import Link from 'next/link'

import { RootResponse, Image } from '@interfaces/ServerResponses'

import Layout from '@components/Layout/Layout'
import Container from '@components/Container/Container'
import Grid from '@components/Grid/Grid'
import SeriesCard from '@components/SeriesCard/SeriesCard'

interface Props {
  series: Image[]
  title: string
  series_url: string
}

const Series: FC<Props> = ({ series, title, series_url }) => {
  const gridItems = series.map((img, i) => (
    <Link key={i} href={`/series/${series_url}/${img._id}`}>
      <a>
        <SeriesCard image={img} icon="fullscreen" />
      </a>
    </Link>
  ))

  return (
    <Layout
      title={`| ${title}`}
      description={`Ника Дмитриева. Фотограф. Серия ${title}.`}
      url={`/series/${series_url}`}
      image={`${series[0].jpg}?width=600`}
    >
      <Container>
        <Grid>{gridItems}</Grid>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:5000/api/client')
  const { series }: RootResponse = await res.json()

  const paths = series.map(({ _id }) => ({
    params: { series_url: _id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { series_url } = params
  const res = await fetch(`http://localhost:5000/api/client`)
  const { images, series }: RootResponse = await res.json()

  const seriesImages = images.filter(
    ({ series_id }) => series_id === series_url
  )
  const { title } = series.find(({ _id }) => _id === series_url)

  return { props: { series: seriesImages, title, series_url } }
}

export default Series
