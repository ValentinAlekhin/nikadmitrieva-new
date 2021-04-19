import styled from 'styled-components'

import { breakpoints } from '@styles/variables'
import { respondTo } from '@styles/respondTo'

export const gridBreakpoints = {
  [breakpoints.xs]: 1,
  [breakpoints.sm]: 2,
  [breakpoints.lg]: 3,
  [breakpoints.xl]: 4,
}

export const Wrapper = styled.div`
  column-count: 1;
  column-gap: 20px;

  ${respondTo.sm`
    column-count: 2;
  `}

  ${respondTo.lg`
    column-count: 3;
  `}

  ${respondTo.xl`
    column-count: 4;
  `}
`

export const Item = styled.div`
  width: 100%;
  break-inside: avoid;
  margin-bottom: 20px;
`
