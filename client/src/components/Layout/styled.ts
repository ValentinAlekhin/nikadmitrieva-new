import styled from 'styled-components'

import HeaderComponent from '@components/Header/Header'
import FooterComponent from '@components/Footer/Footer'

export const Layout = styled.div`
  display: grid;
  grid-template-rows: max-content;
  height: 100%;
`

export const Header = styled(HeaderComponent)`
  align-self: start;
`

export const Content = styled.div`
  align-self: start;
`

export const Footer = styled(FooterComponent)`
  align-self: end;
`
