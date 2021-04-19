import Link from 'next/link'

import Container from '@components/Container/Container'
import ActiveLink from '@components/ActiveLink/ActiveLink'
import Socials from '@components/Socials/Socials'

import {
  Wrapper,
  StyledHeader,
  Title,
  HeaderLink,
  NavAndSocials,
  NavWrapper,
  NavList,
  NavItem,
  NavLink,
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
            <Link href="/" passHref>
              <HeaderLink>Nika Dmitrieva</HeaderLink>
            </Link>
          </Title>
          <NavAndSocials>
            <NavWrapper>
              <NavList>
                {links.map(({ to, title }, i) => (
                  <NavItem key={i}>
                    <ActiveLink href={to} passHref activeClassName="active">
                      <NavLink>{title}</NavLink>
                    </ActiveLink>
                  </NavItem>
                ))}
              </NavList>
            </NavWrapper>
            <Socials />
          </NavAndSocials>
        </StyledHeader>
      </Container>
    </Wrapper>
  )
}

export default Header
