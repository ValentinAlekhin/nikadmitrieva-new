import React from 'react'

import MainContainer from '../../shared/MainContainer/MainContainer'

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
      <MainContainer>
        <StyledHeader>
          <Title>
            <HeaderLink to="/">Nika Dmitrieva</HeaderLink>
          </Title>
          <NavWrapper>
            <NavList>
              {links.map(({ to, title }, i) => (
                <NavItem key={i}>
                  <StyledNavLink to={to}>{title}</StyledNavLink>
                </NavItem>
              ))}
            </NavList>
          </NavWrapper>
        </StyledHeader>
      </MainContainer>
    </Wrapper>
  )
}

export default Header
