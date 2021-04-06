import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { ContentContext } from 'context/ContentState'

import MainContainer from 'shared/MainContainer/MainContainer'
import SeriesCard from 'components/SeriesCard/SeriesCard'

import { Wrapper } from './styled'

import { breakpoints } from 'style/variables'

const gridBreakpoints = {
  [breakpoints.xs]: 1,
  [breakpoints.sm]: 2,
  [breakpoints.lg]: 3,
  [breakpoints.xl]: 4,
}

const Home = () => {
  const { getSeries } = useContext(ContentContext)
  const gridItems = getSeries().map(({ title, titleImage, _id }, i) => (
    <Link key={i} to={`/series/${_id}`}>
      <SeriesCard title={title} titleImage={titleImage} />
    </Link>
  ))

  return (
    <MainContainer>
      <Wrapper>
        <ResponsiveMasonry columnsCountBreakPoints={gridBreakpoints}>
          <Masonry gutter="20px">{gridItems}</Masonry>
        </ResponsiveMasonry>
      </Wrapper>
    </MainContainer>
  )
}

export default Home
