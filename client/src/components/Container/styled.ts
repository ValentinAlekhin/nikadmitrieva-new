import styled from 'styled-components'

import { respondTo } from '@styles/respondTo'
import { mainContainerWidthInPercentage as mainContainerWidth } from '@styles/variables'

export const Wrapper = styled.div`
  width: ${mainContainerWidth.xs}%;
  margin: 0 auto;

  ${respondTo.sm`
    width: ${mainContainerWidth.sm}%;
  `}

  ${respondTo.md`
    width: ${mainContainerWidth.md}%;
  `}

  ${respondTo.lg`
    width: ${mainContainerWidth.lg}%;
  `}
  
  ${respondTo.xl`
    width: ${mainContainerWidth.xl}%;
  `}
`
