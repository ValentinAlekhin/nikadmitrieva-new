import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
  }

  body {
    color: #000;
    font-family: 'Poppins', sans-serif;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  ul {
    list-style: none;
  } 
  a
  {
    text-decoration: none;
    color: #000;
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
`

export default GlobalStyle
