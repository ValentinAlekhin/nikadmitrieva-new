import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { ContentContext } from 'context/ContentState'

import MainContainer from 'shared/MainContainer/MainContainer'
import Grid from 'components/Grid/Grid'
import SeriesCard from 'components/SeriesCard/SeriesCard'

import { Wrapper } from './styled'

const Home = () => {
  const { getSeries } = useContext(ContentContext)
  const gridItems = getSeries().map(({ title, titleImage, _id }, i) => (
    <Link key={i} to={`/series/${_id}`}>
      <SeriesCard title={title} image={titleImage} />
    </Link>
  ))

  return (
    <MainContainer>
      <Wrapper>
        <Grid>{gridItems}</Grid>
      </Wrapper>
    </MainContainer>
  )
}

export default Home
