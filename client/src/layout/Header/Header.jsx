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
  { to: '/', title: 'Главная' },
  { to: '/contacts', title: 'Контакты' },
  { to: '/about', title: 'Обо мне' },
]

const Header = () => {
  return (
    <Wrapper>
      <MainContainer>
        <StyledHeader>
          <Title>
            <HeaderLink to="/">Ника Дмитриева</HeaderLink>
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
