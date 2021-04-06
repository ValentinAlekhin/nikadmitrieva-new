import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { breakpoints } from 'style/variables'

const gridBreakpoints = {
  [breakpoints.xs]: 1,
  [breakpoints.sm]: 2,
  [breakpoints.lg]: 3,
  [breakpoints.xl]: 4,
}

const Grid = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={gridBreakpoints}>
      <Masonry gutter="20px">{children}</Masonry>
    </ResponsiveMasonry>
  )
}

export default Grid
