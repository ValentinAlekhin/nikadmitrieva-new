import styled, { css } from 'styled-components'

import TelegramSVG from './icons/telegram.svg'
import InstagramSVG from './icons/instagram.svg'

const iconStyles = css`
  width: 20px;
  height: 20px;
  fill: #8c8c8e;
  transition: all 0.3s;

  &:hover {
    fill: #404044;
  }
`

export const Wrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50px;
`

export const SocialsLink = styled.a`
  display: flex;
  align-items: center;
`

export const InstagramIcon = styled(InstagramSVG)`
  ${iconStyles}
`

export const TelegramIcon = styled(TelegramSVG)`
  ${iconStyles}
`
