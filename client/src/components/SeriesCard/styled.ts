import styled, { css } from 'styled-components'

import ProgressiveImg from '@components/ProgressiveImage/ProgressiveImage'
import CircleIcon from '@ui/CircleIcon/CircleIcon'

const stretchStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`

export const StyledProgressiveImg = styled(ProgressiveImg)`
  transition: all 0.3s;
  ${Wrapper}:hover & {
    transform: scale(1.05);
  }
`

export const Overlay = styled.div`
  ${stretchStyles}
  display: flex;
  align-items: flex-end;
  background: rgba(64, 64, 68, 0.7);
  opacity: 0;
  transition: all 0.3s;
  ${Wrapper}:hover & {
    opacity: 1;
  }
`

export const OverlayContent = styled.div`
  ${stretchStyles}
  display: flex;
  align-items: flex-end;
  padding: 20px 25px;
  transform: scale(0.9);
  transition: all 0.3s;
  ${Wrapper}:hover & {
    transform: scale(1);
  }
`

export const StyledCircleIcon = styled(CircleIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Title = styled.h4`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`
