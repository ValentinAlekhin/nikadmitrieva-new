import styled, { css } from 'styled-components'

import PlusSVG from './icons/plus.svg'
import FullscreenSVG from './icons/fullscreen.svg'
import ArrowSVG from './icons/arrow.svg'

const iconStyles = css`
  width: 20px;
  fill: #fff;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #404044;
  width: 55px;
  height: 55px;
  border-radius: 50px;
  line-height: 57px;
  text-align: center;
`

export const PlusIcon = styled(PlusSVG)`
  ${iconStyles}
`

export const FullscreenIcon = styled(FullscreenSVG)`
  ${iconStyles}
`

export const RightArrowIcon = styled(ArrowSVG)`
  ${iconStyles}
  width: 27px;
`

export const LeftArrowIcon = styled(RightArrowIcon)`
  transform: rotate(180deg);
`
export const CloseIcon = styled(PlusIcon)`
  width: 23px;
  transform: rotate(45deg);
`
