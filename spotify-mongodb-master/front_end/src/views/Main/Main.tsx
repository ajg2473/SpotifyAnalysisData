import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import Detail from './components/Detail/Detail';
import Search from './components/Search';

const Nav = styled.div`
  color: white;
  background-color: black;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  text-align: center;
  align-items: center;
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  height: 100vh;
`;

const Content = styled.div`
  background-color: white;
  padding: 50px 0 50px 0;
  width: 40%;
  margin: 0 auto;
`;

class Main extends Component {
    render(): React.ReactNode {
        return (
            <Router>
                <MainContainer>
                    <Nav>
                        <div />
                        <h1>Spotify Analysis Data</h1>
                        <div />
                    </Nav>
                    <Content>
                        <Route exact path="/detail" component={Detail} />
                        <Route exact path="/" component={Search}/>
                     </Content>
                </MainContainer>
            </Router>
        )
    }
}

export default Main;
