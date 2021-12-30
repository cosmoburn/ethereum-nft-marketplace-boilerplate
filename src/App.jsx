import { useEffect, useState} from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import NFTBalance from "components/NFTBalance";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import NFTMarketTransactions from "components/NFTMarketTransactions";
import Marketplace from './Marketplace/Marketplace'
import { getCollection } from './helpers/collections'
import styled from '@emotion/styled'

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  const collection = getCollection()

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header>
          <Logo>
            LOGO
          </Logo>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["nftMarket"]}
          >
            <NavLink to="/NFTMarketPlace">Marketplace</NavLink>
            <NavLink to="/nftBalance">My Collection</NavLink>
            <NavLink to="/Transactions">My Transactions</NavLink>
            <NavLink to="/" >FAQ</NavLink>
          </Menu>
          <AccountContainer>
            {/*<NativeBalance />*/}
            <Account />
          </AccountContainer>
        </Header>
        <Container>
          <Switch>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/NFTMarketPlace">
              {/*<NFTTokenIds inputValue={inputValue} setInputValue={setInputValue}/>*/}
              <Marketplace collection={collection}/>
            </Route>
            <Route path="/Transactions">
              <NFTMarketTransactions />
            </Route>
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </Container>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          Footer here
        </Text>
      </Footer>
    </Layout>
  );
};

const Layout = styled.div`
  background-color: black;
  color: white;
`

const Header = styled.header`
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
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

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
`

const Footer = styled.footer`
`

export default App;
