import Head from 'next/head'

import { RootResponse } from '@interfaces/ServerResponses'

import MainContainer from '@components/Container/Container'
import Grid from '@components/Grid/Grid'
import SeriesCard from '@components/SeriesCard/SeriesCard'

const Series = ({ series, title }) => {
  const gridItems = series.map((img, i: number) => (
    <SeriesCard key={i} image={img} />
  ))

  const description = `Ника Дмитриева. Художник и фотограф. Серия ${title}`

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta property="og:title" content={description} key="og:title" />
        <title>Nika Dmitrieva | {title}</title>
      </Head>
      <MainContainer>
        <Grid>{gridItems}</Grid>
      </MainContainer>
    </>
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
  const res = await fetch(`http://localhost:5000/api/client`)
  const { images, series }: RootResponse = await res.json()

  const seriesImages = images.filter(({ series_id }) => series_id === params.id)
  const { title } = series.find(({ _id }) => _id === params.id)

  return { props: { series: seriesImages, title } }
}

export default Series
