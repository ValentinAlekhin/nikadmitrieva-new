import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { ContentContext } from 'context/ContentState'

import MainContainer from 'shared/MainContainer/MainContainer'
import Grid from 'components/Grid/Grid'
import SeriesCard from 'components/SeriesCard/SeriesCard'

import { Wrapper } from './styled'

const Series = () => {
  const { id } = useParams()
  const { getSeriesImages } = useContext(ContentContext)
  console.log(getSeriesImages(id))
  const gridItems = getSeriesImages(id).map((img, i) => (
    <SeriesCard key={i} image={img} />
  ))

  return (
    <MainContainer>
      <Wrapper>
        <Grid>{gridItems}</Grid>
      </Wrapper>
    </MainContainer>
  )
}

export default Series
