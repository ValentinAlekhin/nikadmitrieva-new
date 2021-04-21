import styled, { css } from 'styled-components'

import CircleIcon from '@ui/CircleIcon/CircleIcon'

const controlStyles = css`
  position: absolute;
  transition: all ease-out 0.2s;
  cursor: pointer;
  display: grid;
  align-items: center;
  justify-content: center;
`

const rightAndLeftControlsStyles = css`
  top: 0;
  bottom: 0;
  width: 20vw;
  min-width: 80px;
`

const iconStyles = css`
  transition: all ease-in-out 0.3s;
`

export const Wrapper = styled.div`
  height: 100vh;
  background-color: #111111;
  overflow: hidden;
`

export const PrevIcon = styled(CircleIcon)`
  ${iconStyles}

  transform: translateX(-20vw);
`

export const NextIcon = styled(CircleIcon)`
  ${iconStyles}

  transform: translateX(20vw);
`

export const CloseIcon = styled(CircleIcon)`
  ${iconStyles}

  transform: translateY(-20vh);
`

export const Close = styled.a`
  ${controlStyles}

  top: 0;
  right: 20vw;
  left: 20vw;
  height: 20vh;
  min-height: 80px;

  &:hover ${CloseIcon} {
    transform: translateY(0);
  }
`

export const Prev = styled.a`
  ${controlStyles}
  ${rightAndLeftControlsStyles}

  left: 0;

  &:hover ${PrevIcon} {
    transform: translateX(0);
  }
`

export const Next = styled.a`
  ${controlStyles}
  ${rightAndLeftControlsStyles}

  right: 0;

  &:hover ${NextIcon} {
    transform: translateX(0);
  }
`

export const Counter = styled.span`
  position: absolute;
  top: 30px;
  right: 30px;
  color: #fff;
  font-size: 1.5rem;
`
