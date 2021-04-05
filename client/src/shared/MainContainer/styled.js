import styled from 'styled-components'
import { respondTo } from '../../style/respondTo'
import { mainContainerWidthInPercentage as mainContainerWidth } from '../../style/variables'

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
