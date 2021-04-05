import { createGlobalStyle } from 'styled-components'

import { mainContainerWidthInPercentage as mainContainerWidth } from './variables'
import { respondTo } from './respondTo'

const GlobalStyle = createGlobalStyle`
  body {
    color: #fff;
    font-family: 'Manrope', sans-serif;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  ul {
    list-style: none;
  } 
  a {
    text-decoration: none;
    color: #fff;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    scrollbar-width: none;
  }
  h1, h2, h3, h4, h5, h6, a, p, span {
    transition: color 0.3s;
  }
  .mainContainer, .contentContainer {
    width: ${mainContainerWidth.xs}%;
    margin: 0 auto;
    
  }
  .mainContainer {
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
  }
`

export default GlobalStyle
