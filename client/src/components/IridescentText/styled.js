import styled, { keyframes } from 'styled-components'

const iridescentAnimation = keyframes`
  0% {opacity: 1}
  50% {opacity: 0.5}
  100% {opacity: 1}
`

export const Wrapper = styled.div`
  animation: ${iridescentAnimation} 2s ease-in infinite;
`

export const Letter = styled.span`
  font-size: 4rem;
  color: #000;
`
