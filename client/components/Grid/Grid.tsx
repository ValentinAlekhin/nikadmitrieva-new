import { FC } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import { gridBreakpoints } from './styled'

interface Props {
  children: JSX.Element[]
}

const Grid: FC<Props> = ({ children }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={gridBreakpoints}>
      <Masonry gutter="20px">{children}</Masonry>
    </ResponsiveMasonry>
  )
}

export default Grid
