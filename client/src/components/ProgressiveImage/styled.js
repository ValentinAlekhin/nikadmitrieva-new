import styled, { css } from 'styled-components'

const imageStyles = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`

export const StyledImg = styled.img`
  ${imageStyles}
`