import styled from 'styled-components'

export const Wrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
`

export const StyledHeader = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h1``

export const HeaderLink = styled.a`
  font-weight: 600;
  font-size: 26px;
  color: #404044;

  &:hover {
    color: #8c8c8e;
  }
`

export const NavWrapper = styled.nav`
  display: flex;
  align-items: center;
`

export const NavList = styled.ul`
  display: flex;
  align-items: center;
`

export const NavItem = styled.li`
  margin-left: 1rem;
`

export const NavLink = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #8f8f8e;

  &.active {
    color: #49494c;
  }

  &:hover {
    color: #8f8f8e;
  }
`

export const SocialsWrapper = styled.div``
