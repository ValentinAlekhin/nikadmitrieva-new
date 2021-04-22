import styled from 'styled-components'

export const Wrapper = styled.footer`
  display: grid;
  align-items: center;
  text-align: center;
  height: 80px;
`

export const Text = styled.span`
  color: #404044;
  font-size: 14px;
`

export const FooterLink = styled.a`
  text-transform: uppercase;
  color: #404044;
  text-decoration: underline;

  &:hover {
    color: #8f8f8e;
  }
`
