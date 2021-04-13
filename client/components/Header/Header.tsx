import React from 'react'

import Container from '@components/Container/Container'

import {
  Wrapper,
  StyledHeader,
  Title,
  HeaderLink,
  NavWrapper,
  NavList,
  NavItem,
  StyledNavLink,
} from './styled'

const links = [
  { to: '/', title: 'Main' },
  { to: '/contacts', title: 'Contacts' },
  { to: '/about', title: 'About' },
]

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <StyledHeader>
          <Title>
            <HeaderLink href="/">
              <a>Nika Dmitrieva</a>
            </HeaderLink>
          </Title>
          <NavWrapper>
            <NavList>
              {links.map(({ to, title }, i) => (
                <NavItem key={i}>
                  <StyledNavLink href={to}>
                    <a>{title}</a>
                  </StyledNavLink>
                </NavItem>
              ))}
            </NavList>
          </NavWrapper>
        </StyledHeader>
      </Container>
    </Wrapper>
  )
}

export default Header
