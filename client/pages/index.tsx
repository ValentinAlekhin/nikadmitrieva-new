import type { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import MainContainer from '@components/Container/Container'
import Grid from 'components/Grid/Grid'
import SeriesCard from 'components/SeriesCard/SeriesCard'

const Home = ({ series }) => {
  const gridItems = series.map(({ title, titleImage, _id }, i) => (
    <Link key={i} href={`/series/${_id}`}>
      <a>
        <SeriesCard title={title} image={titleImage} />
      </a>
    </Link>
  ))

  const { isFallback } = useRouter()

  if (isFallback) {
    return <></>
  }

  return (
    <MainContainer>
      <div>
        <Grid>{gridItems}</Grid>
      </div>
    </MainContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:5000/api/client')
  const { series } = await res.json()

  return {
    revalidate: 1,
    props: {
      series,
    },
  }
}

export default Home
