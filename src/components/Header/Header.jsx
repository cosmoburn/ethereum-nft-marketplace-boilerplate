import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

import Account from '../Account'

const Header = () => {
  return (
    <AppHeader>
      <NavLink to="/" >
        <Logo>
          LOGO
        </Logo>
      </NavLink>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["nftMarket"]}
      >
        <NavLink to="/marketplace">Marketplace</NavLink>
        <NavLink to="/collection">My Collection</NavLink>
        <NavLink to="/faq" >FAQ</NavLink>
      </Menu>
      <AccountContainer>
        <Account />
      </AccountContainer>
    </AppHeader>
  )
}

const AppHeader = styled.header`
  display: flex;
  justify-content: center;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const Menu = styled.menu`
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 2rem;
  a {
    color: #fff;
    font-size: 8px;
    font-style: italic;
    font-weight: 500;
    letter-spacing: 1.2px;
    caret-color: transparent;
    text-align: end;
    transition: .15s;
    text-transform: uppercase;
    margin: 10px;
    padding: 8px;
    
    :hover {
      color: #BFC500;
    }
  }
`

const AccountContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
`
export default Header
