import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "antd/dist/antd.css";
import "./style.css";
import Text from "antd/lib/typography/Text";
import styled from '@emotion/styled'

import { getCollection } from './helpers/collections'
import LandingPage from './components/LandingPage/LandingPage'
import Marketplace from './Marketplace/Marketplace'
import MyCollection from "components/MyCollection/MyCollection";
import FAQ from './components/FAQ/FAQ'

const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  const collection = getCollection()

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    console.log('web3', isWeb3Enabled)
    console.log('authenticated', isAuthenticated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout>
      <Router>
        <Container>
          <Switch>
            <Route path="/" component={ LandingPage } exact={true}/>
            <Route path="/marketplace">
              <Marketplace collection={collection}/>
            </Route>
            <Route path="/collection" component={ MyCollection } />
            <Route path="/faq" component={ FAQ } />
            {/*<Route path="/Transactions">*/}
            {/*  <NFTMarketTransactions />*/}
            {/*</Route>*/}
          </Switch>
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
  height: 100vh;
  overflow: auto;
  background-color: black;
  color: white;
`

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  display: block;
`

const Footer = styled.footer`
`

export default App;
