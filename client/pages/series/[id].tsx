import { FC } from 'react'

import { RootResponse, Image } from '@interfaces/ServerResponses'

import Layout from '@components/Layout/Layout'
import Container from '@components/Container/Container'
import Grid from '@components/Grid/Grid'
import SeriesCard from '@components/SeriesCard/SeriesCard'

interface Props {
  series: Image[]
  title: string
  id: string
}

const Series: FC<Props> = ({ series, title, id }) => {
  const gridItems = series.map((img, i) => <SeriesCard key={i} image={img} />)

  return (
    <Layout
      title={`| ${title}`}
      description={`Ника Дмитриева. Фотограф. Серия ${title}.`}
      url={`/series/${id}`}
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
    params: { id: _id },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const res = await fetch(`http://localhost:5000/api/client`)
  const { images, series }: RootResponse = await res.json()

  const seriesImages = images.filter(({ series_id }) => series_id === id)
  const { title } = series.find(({ _id }) => _id === id)

  return { props: { series: seriesImages, title, id } }
}

export default Series
