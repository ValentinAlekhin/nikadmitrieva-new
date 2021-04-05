import styled from 'styled-components'

import { respondTo } from 'style/respondTo'

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;

  ${respondTo.sm`
    grid-template-columns: 1fr 1fr;
  `}

  ${respondTo.xl`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`

export const ColumnItem = styled.div`
  margin-bottom: 1rem;
`

export const Column = styled.div``
